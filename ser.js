const express = require('express');
const fs = require('fs');
const path= require('path');
const app = express();
const BLOGS_FILE = path.join(__dirname, 'blogs.json');

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.set('view engine', 'ejs');
// app.use(express.static('public'));
let blogs=[];

// HOME
app.get('/', (req, res) => {
  res.render('layout', { page: 'home' });
});
// LIBRARY
app.get('/library', (req, res) => {
  res.render('layout', { page: 'library'});
});

//WRITE
app.get('/write',(req,res)=>{
  res.render('layout', { page: 'write' });

})
//profile
app.get('/profile', (req, res) => {
  const blogs = getBlogs();  // read blogs from JSON
  res.render('layout', { page: 'profile', blogs });
});

function getBlogs() {
  if (!fs.existsSync(BLOGS_FILE)) return [];
  const data = fs.readFileSync(BLOGS_FILE, 'utf8');
  return JSON.parse(data);
}

// Save blogs to file
function saveBlogs(blogs) {
  fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2));
}


//HANDLE SUBMIT
app.post('/write', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).send("Title and content required");

  // Get current blogs from file
  const blogs = getBlogs();

  // Add new blog at the beginning
  blogs.unshift({
    id: Date.now(), // unique id
    title,
    content,
    createdAt: new Date()
  });

  // Save back to file
  saveBlogs(blogs);

  // Redirect to profile page
  res.redirect('/profile');
});





app.listen(5000, () => {
  console.log('Server running at http://localhost:5000');
});
