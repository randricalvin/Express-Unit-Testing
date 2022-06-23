const connexion = require('../../../db-config');
const db = connexion.promise();

const getOne = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM track WHERE id = ?', [id])
    .then((result) => {
      if (result[0].length === 0) {
        res.status(404).send('Track not found');
      } else {
        res.status(200).json(result[0]);
      }
    })
    .catch((err) => {
      res.status(404).send(err);
  });
};

const getAll = (req, res) => {
  db.query('SELECT * FROM track')
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((err) => {
      res.status(404).send(err);
  });
};

const postTracks = (req, res) => {
  const track = req.body;
  db.query('INSERT INTO track SET ?', [track])
    .then((result) => {
      if (result.affectedRows === 0) {
        res.status(404).send('track not created');
      } else {
        res.status(200).send('track created');
      }
    })
    .catch((err) => {
      res.status(404).send(err);
  });
};

const updateTracks = (req, res) => {
  const track = req.body;
  const id = req.params.id;
  db.query('UPDATE track SET ? WHERE id = ?', [track, id])
    .then((result) => {
      if (result.affectedRows === 0) {
        res.status(404).send('track not updated');
      } else {
        res.status(200).send('track updated');
      }
    })
    .catch((err) => {
      res.status(404).send(err);
  });
};

const deleteTracks = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM track WHERE id = ?', [id])
    .then((result) => {
      if (result.affectedRows === 0) {
        res.status(404).send('track not deleted');
      } else {
        res.status(200).send('track deleted');
      }
    })
    .catch((err) => {
      res.status(404).send(err);
  });
};

module.exports = { getOne, getAll, postTracks, updateTracks, deleteTracks };
