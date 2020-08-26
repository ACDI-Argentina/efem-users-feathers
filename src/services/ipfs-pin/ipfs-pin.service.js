const pinataSDK = require('@pinata/sdk');

/**
 * Servicio encargado de realizar IPFS Pinning
 * a través de Pitana SDK.
 * 
 * Este debiera ser un API RPC, pero se implementa según se
 * sugiere en la FAQ "How do I create custom methods?".
 * 
 * Se implementa como un servicio de Feathers para no exponer
 * las credenciales de Pitana en la Dapp.
 * 
 */
class IpfsPinService {

    create(data, params) {
        
        const cid = data.cid;
        const options = {
            pinataMetadata: {
                keyvalues: {
                    env: 'Testing'
                }
            }
        }
        return this.pinata.pinByHash(cid, options)
            .then(result => {
                return result;
            })
            .catch(err => {
                throw new Error('IPFS Pinning error', err);
            });
    }

    setup(app) {
        this.app = app;
        this.pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY);
    }
}

module.exports = function ipfsPinService() {
    const app = this;
    app.use('/ipfs-pin', new IpfsPinService());
};