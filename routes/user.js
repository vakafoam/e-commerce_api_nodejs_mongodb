const router = require("express").Router();

// /api/users/userTest
router.get("/userTest", (req, resp) => {
  resp.send("User test is successfull!");
});

router.post("/userPostTest", (req, resp) => {
  const username = req.body.username;
  console.log("Username received: ", username);
  resp.send(JSON.stringify({ name: "Your username is: " + username }));
});

module.exports = router;
