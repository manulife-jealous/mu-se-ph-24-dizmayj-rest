var express = require('express');
var router = express.Router();
const {employees} = require('../data/employees');

router.get('/', function(req, res, next) {
  let leanemployees = employees;
  if(!leanemployees) {
      return res.status(404).json({error: "No employees found!"});
  }
  res.status(200).json(leanemployees);
});

router.get('/id/:id', function(req, res, next) {
  const {id} = req.params;
  let leanemployees = employees.find(e=> e.id === id.toString());
  if(!leanemployees || leanemployees.length == 0) {
      return res.status(404).json({error: "No employees found!"});
  }
  res.status(200).json(leanemployees);
});

router.get('/department/:department', function(req, res, next) {
  const {department} = req.params;
  let leanemployees = employees.filter(e=> e.department === department.toString());
  if(!leanemployees || leanemployees.length == 0) {
      return res.status(404).json({error: "No employees found in this Department!"});
  }
  res.status(200).json(leanemployees);
});

router.get('/departments', function(req, res, next) {
  let leandepartments = employees.map((e)=> {return e.department});
  if(!leandepartments || leandepartments.length == 0) {
      return res.status(404).json({error: "No employee Departments!"});
  }
  let newset = [... new Set(leandepartments)].map((e, index)=> {return { id: index, name: e}});
  res.status(200).json(newset);
});

module.exports = router;