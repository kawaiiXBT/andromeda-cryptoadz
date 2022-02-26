import fs from 'fs'
import { NFTStorage, File } from 'nft.storage'

const endpoint = 'https://api.nft.storage' // the default
const token = '' // your API key from https://nft.storage/manage

const toadz = require('../data/toadz.json')

async function main() {
  const storage = new NFTStorage({ endpoint, token })

  for (let t of toadz) {
    const metadata = await storage.store({
      name: 'AndromedaToadz #' + t.id,
      description:
        'Small amphibious creatures that leapt across the universe and now call Metis Andromeda their home.',
      external_url: 'https://andromedatoadz.xyz/',
      image: new File([await fs.promises.readFile(t.id + '.jpg')], t.id + '.jpg', {
        type: 'image/jpg',
      },
      attributes: )
    })
    console.log('IPFS URL for the metadata:', metadata.url)
    console.log('metadata.json contents:\n', metadata.data)
    console.log(
      'metadata.json contents with IPFS gateway URLs:\n',
      metadata.embed()
    )
  }

}
main()