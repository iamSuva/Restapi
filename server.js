const express=require("express");
const app=express();
const port=3000;

app.use(express.json());

let allcourses=[
    {id:1,coursename:"C++ with Harry"},
    {id:2,coursename:"C with MycodeSchool"},
    {id:3,coursename:"DSA with LoveBabbar"},
    {id:4,coursename:"JAVA with Abdul Bari"},
    {id:5,coursename:"Node with Mosh"}
]

//

app.get("/",(req,res)=>{
    res.send("welcome to nodejs and express ");
})
app.get("/course/:year/:month",(req,res)=>{
    // res.send(req.params);
    res.send(req.query)
})
app.get("/course",(req,res)=>{
    // res.send(JSON.stringify(allcourses));
    res.send(allcourses);
})
app.get("/course/:id",(req,res)=>{
    const single=allcourses.find((x)=>{return  x.id===parseInt(req.params.id)});
    // console.log(single);
    if(!single) {
      return  res.status(404).send("Course for the given id not found")
    }
    res.send(single);
})
//add course
app.post("/course",(req,res)=>{
     console.log(req.body.coursename)
     if(!req.body.coursename||req.body.coursename.length<5)
     {
        res.status(400).send("name is required and should be minimum length > 3");
        return;
     }
    const newcourse={
        id:allcourses.length+1,
        coursename:req.body.coursename,
    }
    allcourses.push(newcourse);
    console.log("addded");
    res.end(JSON.stringify(allcourses));
})
//http put request
app.put("/course/:id",(req,res)=>{
    const singlecourse=allcourses.find((x)=>{return x.id===parseInt(req.params.id)})
    if(!singlecourse)
    {
      return  res.status(404).send("course is not found");
    }
    if(!req.body.coursename || req.body.coursename.length<4)
    {
        res.status(400).send("course name is required and length >4") //400 bad request
        return;
    }
    //update the course
    singlecourse.coursename=req.body.coursename;
    res.status(200).send(singlecourse);
})

//delete request
app.delete("/course/:id",(req,res)=>{
    const singlecourse=allcourses.find((x)=>{return x.id===parseInt(req.params.id)})
    if(!singlecourse)
    {
        return res.status(404).send("course is not found"); //bad req
    }
    console.log(singlecourse);
    //delete the course
    const index=allcourses.indexOf(singlecourse);
    console.log(index);
    allcourses.splice(index,1);
    res.send(singlecourse);
   
})

app.listen(port,()=>console.log(`listening to port ${port}`));