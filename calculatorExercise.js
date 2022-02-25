const express = require("express");
const app = express();
const ExpressError = require("./expressError");

const { getMean, getMedian, getMode, validateQuery } = require("./functions");

app.get("/mean", (req, res, next) => {
  //if no  numbers are entered
  try {
    if (!req.query.nums) {
      throw new ExpressError(
        "Enter nums parameter in query-string, separated  by comma",
        401
      );
    }
    const nums = validateQuery(req.query.nums);
    if (nums instanceof Error) {
      throw new ExpressError(nums.message);
    }
    const mean = getMean(nums);
    return res.send({ operation: "mean", value: mean });
  } catch (e) {
    next(e);
  }
});

app.get("/median", (req, res, next) => {
  //if no numbers entered

  try {
    if (!req.query.nums) {
      throw new ExpressError(
        "Enter nums parameter in query-string, separated  by comma",
        401
      );
    }
    const nums = validateQuery(req.query.nums);
    if (nums instanceof Error) {
      throw new ExpressError(nums.message);
    }
    const median = getMedian(nums);
    return res.send({ result: { operation: "median", value: median } });
  } catch (e) {
    next(e);
  }
});
app.get("/mode", (req, res, next) => {
  //if no numbers entered
  try {
    if (!req.query.nums) {
      throw new ExpressError(
        "Enter nums parameter in query-string, separated  by comma",
        401
      );
    }
    const nums = validateQuery(req.query.nums);
    if (nums instanceof Error) {
      throw new ExpressError(nums.message);
    }
    const mode = getMode(nums);
    return res.send({ result: { operation: "mode", value: mode } });
  } catch (e) {
    next(e);
  }
});

// If no other route matches, respond with a 404
app.use((req, res, next) => {
  const e = new ExpressError("Page Not Found", 404);
  next(e);
});

//Handling errors

app.use(function (err, req, res, next) {
  //default status is 500
  let status = err.status || 500;
  let message = err.msg;

  //Setting status and  alerting about it
  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(3000, function () {
  console.log("App abierta en el puerto 3000");
});
