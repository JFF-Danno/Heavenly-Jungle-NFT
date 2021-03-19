const ArtPiece = artifacts.require("ArtPiece");

module.exports = function(deployer) {
  deployer.deploy(ArtPiece);
};
