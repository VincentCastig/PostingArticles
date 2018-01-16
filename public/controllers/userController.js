module.exports = {
  post_article: (req,res) => {
      const db = req.app.get('db');
      const { title, category, content } = req.body;
      console.log(req.body);
      db.post_article(title, category, content).then((response) => res.status('200').send(response)).catch(() => rest.status.send('404'));
  },

  get_all_articles: (req,res) => {
      const db = req.app.get('db');
      db.get_all_articles().then((data) => res.status('200').send(data)).catch(() => rest.status.send('404'));
  },
 
  get_article: (req, res) => {
      const db = req.app.get('db');
      const { id } = req.params;
      console.log(id)
      db.get_article(id).then((data) => res.status('200').send(data)).catch(() => rest.status.send('404'));
  }
}