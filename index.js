const express = require("express");
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const app = express();
const serviceAccount = require("./servicekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:"*"
}))
const db = admin.firestore();
const SECRET_KEY = "internshipproj"; 
app.use(express.json());
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.collection("users").doc(email).set({ email, password: hashedPassword });
  res.send("User registered");
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const userDoc = await db.collection("users").doc(email).get();
  if (!userDoc.exists) {
    return res.status(400).send("User not found");
  }

  const user = userDoc.data();
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(400).send("Invalid credentials");
  }
});

app.get("/api/suppliers", authenticateJWT, async (req, res) => {
  let suppliers = [];
  await db.collection("suppliers").get().then(snapshot => {
    snapshot.forEach(doc => {
      suppliers.push(doc.data().name);
    });
  });
  res.send(suppliers);
});
app.post("/api/suppliers", authenticateJWT, async (req, res) => {
  const { name } = req.body;
  await db.collection("suppliers").doc(name).set({ name });
  res.send("Supplier added");
});

app.get("/api/manufacturers", authenticateJWT, async (req, res) => {
  let manufacturers = [];
  console.log("here")
  await db.collection("manufacturers").get().then(async snapshot => {
  snapshot.forEach(async doc => {
      console.log(doc.data().name);
      manufacturers.push(await doc.data().name);
    });
  });
  res.send(manufacturers);
});
app.post("/api/manufacturers", authenticateJWT, async (req, res) => {
  const { name } = req.body;
  console.log(name);
  await db.collection("manufacturers").add({ name:name });
  res.send("Manufacturer added");
});
app.get("/api/buyers", authenticateJWT, async (req, res) => {
  let buyers = [];
  await db.collection("buyers").get().then(snapshot => {
    snapshot.forEach(async doc => {
      buyers.push(await doc.data());
    });
  });
  res.send(buyers);
});
app.post("/api/buyers", authenticateJWT, async (req, res) => {
  const { name ,gstnum,address} = req.body;
  await db.collection("buyers").doc(name).set({name: name,GST:gstnum,address:address });
  res.send("Buyer added");
});
app.get("/api/loans", authenticateJWT, async (req, res) => {
  let loans = [];
  await db.collection("loans").get().then(snapshot => {
    snapshot.forEach(doc => {
      loans.push({
        "from": doc.data().from,
        "to": doc.data().to,
        "amount": doc.data().amount,
        "status": doc.data().status
      });
    });
  });
  res.send(loans);
});

app.post("/api/loans", authenticateJWT, async (req, res) => {
  let loan = req.body;
  await db.collection("loans").add(loan);
  res.send("Loan added");
});

app.put("/api/loans/:id", authenticateJWT, async (req, res) => {
  let id = req.params.id;
  let updatedLoan = req.body;
  await db.collection("loans").doc(id).update(updatedLoan);
  res.send("Loan updated");
});

app.delete("/api/loans/:id", authenticateJWT, async (req, res) => {
  let id = req.params.id;
  await db.collection("loans").doc(id).delete();
  res.send("Loan deleted");
});

app.get("/api/supplierLoans/:id", authenticateJWT, async (req, res) => {
  let id = req.params.id;
  let loans = [];
  await db.collection("loans").where("from", "==", id).get().then(snapshot => {
    snapshot.forEach(doc => {
      loans.push(doc.data().to);
    });
  });
  res.send(loans);
});

app.listen(3000, () => console.log("Server is running on port 3000"));
