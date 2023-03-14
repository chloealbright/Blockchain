const SHA256 = require('crypto-js/sha256'); //to calculate hash 

/*** Block Creation
@index  where the block sits on the chain
@timestamp when the block was created
@data included in the block, ex: amount of currency
@prevHash is the hash of the previous block

hash set to "" bc we need to calculate the hash of the block
SHA256 Patented cryptographic hash function used to calculate the hash of the block
256 bits long.

DEPENDENCIES FOR README:
npm install crypto-js

*/
class Block{
    
    constructor(index, timestamp, data, prevHash=""){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash=this.calculateHash();
    }

    calculateHash(){
        return SHA256(
            this.index + 
            this.prevHash + 
            this.timestamp + 
            JSON.stringify(this.data)).toString();
    }
}
/** Blockchain Creation
 The genesis block is the first block in the chain, it has index 0.
 i.e has no previous block.
 new Block(index, date, data, previous hash)

 https://www.smashingmagazine.com/2021/01/nodejs-api-ethereum-blockchain/
 https://www.xilinx.com/products/design-tools/resources/the-developers-guide-to-blockchain-development.html

https://www.section.io/engineering-education/building-a-simple-cryptocurrency-blockchain/


Basic Structure of backend of Blockchain that uses Etherium and runs it on nodejs
Semi decentralized app
Build an Etherium blockchain 
Integrate it into a standard API in nodejs

Similar architecture to centralized app:
User interacts with the front end -web or mobile-
which then interacts with the back end APIs
The backend then requests to interact with Smart Contracts or Blockchain through
public nodes that run on Nodejs OR backend uses blockchain directly by running nodejs

Basic Structure application:
authentication - registered users
storage of data - currency data stored on ipfs and address stored on blockchain for retrieval
-simulate blockchain for capstone? - 
Retrieval - any authenticated user can retrieve any data stored on blockchain


STEPS: Create
 [] Block 
 [] Blockchain
 [] Genesis Block
 [] Method to add new block to the chain
 [] Method to get the previous hash of the last block in the chain
 [] Proof of work slows down the chain creation- makes it difficult to tamper with the blockchain
 [] Distributed P2P network: users get copy of the blockchain which verifies the chain is valid
 blocks that are tampered with will be rejected by the network.
 You'd need to take over 50% of the network to tamper with the blockchain.
 [] smart contracts are automatically stored in the blockchain to authorize use cases for the blockchain.
 [] Connect with users
 [] Connect and store with firebase

 ## Block 
 * includes constructor for (hash index, timestamp, data, previous hash)
 * includes calculateHash() using cryptographic hash function from SHA256 Library

 ## Blockchain
 * includes automated creation of genesis block for each new chain
 * includes Genesis Block creation
 * includes method to GET previous block in the chain
 * includes method to ADD new block to the chain
 
 ## Smart Contracts
 Immutable and distributed: can never be changed and output is validated by everyone on the network
 Defines terms of how the blockchain can be used and distributed
 * if user 1 receives a loan, the loan will be paid in full when the user
 reaches x amount in their blockchain
 * users receive points in the form of the amount specified in the blockchain
 * if user 1 requests amount of currency from user 2, 
 * if user 1 wants to send currency to user 2, 
 * if user 1 wants to send currency above their balance,
 * if user 1 wants to cancel currency sent to user 2,

 */
class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        // Optional, blockchain difficulty: this.difficulty = 2;
    }

    createGenesisBlock(){
        return new Block(0, "30/01/2023", "Genesis Block", 0);
    }

    getPreviousBlock(){
        return this.chain[this.chain.length - 1];
     }

     addBlock(newBlock){
        newBlock.prevHash = this.getPreviousBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
        console.log(this.chain);
     }

     validateChain(){

     }
}


let cannoli = new Blockchain();
cannoli.addBlock(new Block(1, "15/02/2023", {amount: 500})); // when block index is 1, previous hash is 0
cannoli.addBlock(new Block(2, "25/02/2023", {amount: 500}));
// console.log(JSON.stringify(cannoli));

console.log(JSON.stringify(cannoli, null, 4)); // to print 0 col/4 row format: null, 4

