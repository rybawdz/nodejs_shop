module.exports = function unauthorized(req, res) {
    if (!req.session.userid) {
      return res.redirect('/login');
    }
  
    res.setHeader('Content-Type', 'text/HTML');
    res.write(`
      <h1>Welcome back ${req.session.userid}</h1>
      <a href="/logout">Logout</a>
    `);
  
    res.end();
  };