class Controller {
  index(req, res) {
    res.json({
      tudoCerto: true,
    });
  }
}

export default new Controller();
