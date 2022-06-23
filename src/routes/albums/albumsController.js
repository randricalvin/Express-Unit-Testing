const connexion = require('../../../db-config');
const db = connexion.promise();

const getAll = (req, res) => {
  db.query('SELECT * FROM albums')
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((err) => {
      res.status(404).send(err);
  });
};

const getOne = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM albums WHERE id = ?', [id])
    .then((result) => {
      if (result[0].length === 0) {
        res.status(404).send('Album not found');
      } else {
        res.status(200).json(result[0]);
      }
    })
    .catch((err) => {
      res.status(404).send(err);
  });
};

const getTracksByAlbumId = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM track WHERE id_album = ?', [id])
    .then((result) => {
      if (result[0].length === 0) {
        res.status(404).send('Tracks not found');
      } else {
        res.status(200).json(result[0]);
      }
    })
    .catch((err) => {
      res.status(404).send(err);
  });
};

const postAlbums = (req, res) => {
  const album = req.body;
  db.query('INSERT INTO albums SET ?', [album])
    .then((result) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Album not created');
      } else {
        res.status(200).send('Album created');
      }
    })
    .catch((err) => {
      res.status(404).send(err);
  });
};

const updateAlbums = (req, res) => {
  const album = req.body;
  const id = req.params.id;
  db.query('UPDATE albums SET ? WHERE id = ?', [album, id])
    .then((result) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Album not updated');
      } else {
        res.status(200).send('Album updated');
      }
    })
    .catch((err) => {
      res.status(404).send(err);
  });
};

const deleteAlbums = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM albums WHERE id = ?', [id])
    .then((result) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Album not deleted');
      } else {
        res.status(200).send('Album deleted');
      }
    })
    .catch((err) => {
      res.status(404).send(err);
  });
};

module.exports = {
  getAll,
  getOne,
  getTracksByAlbumId,
  postAlbums,
  updateAlbums,
  deleteAlbums,
};
