/*
SPDX-License-Identifier: GPL-3.0

                                        ANDROMEDA-CRYPTOADZ

MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM0:',',,''''''''''''''''''',,'''',':0MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMNkolccccccccccccccccccccccccccccccccccookNMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMWXKk;.cXMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMXc.;kKXWMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMNc.,kXNWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWXKk,.cNMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMX;  ,::::::::::::oXM0c:::::::::::::kWMMMMMMO. ;XMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMKkxc;'        .,,;,lXMx.        ';,,;xWMMMMMMKc,cxkKMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMWNNl..xM0,      .dWWWWWMMx.       'OMWWWMMMMMMMMMMWx. lNNWMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMO;'lO0NMWKOOOOOO0XMMMMMMMN0OOOOOOO0NMMMMMMMMMMMMMMMx. .',OMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMXxl,  'llllllllllllllllllllllllllllllllllllllllldKMMMMx. .clllxXMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMWK0x;..     .....................................  .kMMMMx. lWNl.;x0KWMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMX: ,ONo     oXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXK: .kMMMMx. lWMNXO, :XMMMMMMMMMMMMMMM
MMMMMMMMMMMMWx;:oxONMd.    .;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;. .kMMMMx. lWMMMNOxo:;xWMMMMMMMMMMMM
MMMMMMMMMMMMNc .kMMMM0c;.  .;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;c0MMMMx. lWMMMMMMk. cNMMMMMMMMMMMM
MMMMMMMMMMMMNc .kMMMMMMWo..dXNWMMMMMMMNXNWMMMMWNXWMMMMMWNXNMMMMMMMMMMWNXd..oWMMMMMMk. cNMMMMMMMMMMMM
MMMMMMMMMMMMNc .kMMMMMMMX0Oc.:0MMMMMMWo.;OMMMMk,'xWWMMMKc.lXMMMMMMMMM0:.cO0XMMMMMMMk. cNMMMMMMMMMMMM
MMMMMMMMMMMMWOlllcxXMMMMMMWklllcxNMMMWOlllcxXMx. lNWWkclllkNMMMMMMNxclllkWMMMMMMMMMk. cNMMMMMMMMMMMM
MMMMMMMMMMMMMMMXl':xOOOOOO0NMKc':xOOOOOOx. '0Mx. lNWX; .oOOOOOOOOOk:':xOOOOOO0NMWKOd;'dWMMMMMMMMMMMM
MMMMMMMMMMMMMMMMNNk'      .xMMWNx. ..      '0Mx. lNWX:          . .xNk'      .xM0, ;0NWMMMMMMMMMMMMM
MMMMMMMMMMMMMMMNo,:dkkkkkxkXMMMMXOxkkx'  ckONMx. lNWW0ko. .okxkkkxOXMNOxkkkkkxc;:dk0WMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMNd:codddddddddddddddddo'  :dddd;  ,oodddc. .lddddddddddddddddddc:oKMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMM0,..........................................................kMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMWXKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKNMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM*/


pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

contract Toadz is ERC721, Ownable, ReentrancyGuard, AccessControl {
    using SafeMath for uint256;
    using Address for address;
    using Address for address payable;

    uint256 public MAX_TOTAL_MINT;
    string private _contractURI;
    string private _baseTokenURI;
    uint256 private _currentTokenId = 0;

    constructor(
    ) ERC721("AndromedaToadz", "ATOADZ") {
        MAX_TOTAL_MINT = 6969;
        _baseTokenURI = 'ipfs://QmaabeE9nyfJTcJrVRWuxFHUVyhTFU9G3GmBLxuqhkKLrU/';
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    // ADMIN

    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    function setContractURI(string memory uri) external onlyOwner {
        _contractURI = uri;
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;

        payable('0x622B4c81D2709a33aBbB2694C65dC0B942722300').transfer(balance);
    }

    // PUBLIC
    
    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC721, AccessControl)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function totalSupply() public view returns (uint256) {
        return _currentTokenId;
    }

    function baseURI() public view returns (string memory) {
        return _baseTokenURI;
    }

    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    function getInfo() external view returns (
        uint256 totalSupply,
        uint256 senderBalance,
        uint256 maxTotalMint
    ) {
        return (
        this.totalSupply(),
        msg.sender == address(0) ? 0 : this.balanceOf(msg.sender),
        MAX_TOTAL_MINT
        );
    }

    /**
     * Accepts required payment and mints a specified number of tokens to an address.
     */
    function purchase(uint256 count) public payable nonReentrant {

        uint256 price;

        if (count < 5) { // 5
            price = 0.69 ether; // 0.69
        }
        if (count > 4 && count < 10) {
            price = 0.55 ether; // 0.55
        }
        if (count > 9) {
            price = 0.42 ether; // 0.420
        }

        // Make sure minting is allowed
        requireMintingConditions(msg.sender, count);

        // Sent value matches required ETH amount
        require(price * count <= msg.value, 'ERC721_COLLECTION/INSUFFICIENT_ETH_AMOUNT');

        for (uint256 i = 0; i < count; i++) {
            uint256 newTokenId = _getNextTokenId();
            _safeMint(msg.sender, newTokenId);
            _incrementTokenId();
        }
    }

    // PRIVATE

    /**
     * This method checks if ONE of these conditions are met:
     *   - Public sale is active.
     *   - Pre-sale is active and receiver is allowlisted.
     *
     * Additionally ALL of these conditions must be met:
     *   - Gas fee must be equal or less than maximum allowed.
     *   - Newly requested number of tokens will not exceed maximum total supply.
     */
    function requireMintingConditions(address to, uint256 count) internal view {

        // Total minted tokens must not exceed maximum supply
        require(totalSupply() + count <= MAX_TOTAL_MINT, "ERC721_COLLECTION/EXCEEDS_MAX_SUPPLY");
    }

    /**
     * Calculates the next token ID based on value of _currentTokenId
     * @return uint256 for the next token ID
     */
    function _getNextTokenId() private view returns (uint256) {
        return _currentTokenId.add(1);
    }

    /**
     * Increments the value of _currentTokenId
     */
    function _incrementTokenId() private {
        _currentTokenId++;
    }
}
