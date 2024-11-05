import readline from 'node:readline'
import connectMongoose from './lib/conect-mongoose.js'
import Product from './models/Items.js'

const connection = await connectMongoose()
console.log('Connected to MongoDB:', connection.name)
const questionResponse = await ask('Are you sure you want to empty the database and create initial data?')
if (questionResponse.toLowerCase() !== 'yes') {
    console.log('Operation aborted.')
    process.exit()
}

await initProducts()

//closing
connection.close()

async function initProducts() {
    // delete all products
    const deleteResult = await Product.deleteMany()
    console.log(`Deleted ${ deleteResult.deletedCount} product.`)
    // create initial products
    const insertResult = await Product.insertMany([
        { name: 'gloves', price: 10000,},
        { name: 'dildo', price: 500,},
        { name: 'car', price: 1500, }
    ])
    console.log(`Created ${ insertResult.length } product.`) 
}

  // ask the user thru the terminal and wait for a answer using Promises
function ask(questionText) {
    return new Promise((resolve, reject) => {
        const consoleInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        consoleInterface.question(questionText, answer => {
            consoleInterface.close()
            resolve(answer)
        })
    })
}