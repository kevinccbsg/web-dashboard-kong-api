import 'babel-polyfill';
import util from 'util';
import defaults from 'defaults';

const exec = util.promisify(require('child_process').exec);
// ldapsearch -H ldap://ldap.etsidi.upm.es:389 -D uid=raquel.cedazo@upm.es,ou=users,dc=upm,dc=es -w password -b ou=users,dc=upm,dc=es uid=raquel.cedazo@upm.es
/*
***********************************
*********EXAMPLE OF USING**********
**********************************
*
const authLdap = new AuthLDAP({});

authLdap.authorice('kj.martinez', 'galactica88cc')
.then((data) => {
  console.log('success');
  console.log(data);
})
.catch((err) => {
  console.log('error');
  console.log(err);
});
*/

const initOptions = {
  host: 'ldap.etsidi.upm.es',
  port: 389,
  rootDN: 'ou=users,dc=upm,dc=es',
};

class AuthLDAP {
  constructor(userOptions) {
    if (!userOptions) {
      throw new Error('You must provide options');
    }
    this.options = defaults(initOptions, userOptions);
  }

  async authorice(userID, pwd) {
    const { rootDN, port, host } = this.options;
    let command = `ldapsearch -H ldap://${host}:${port} -D uid=${userID}@alumnos.upm.es,${rootDN} -w ${pwd} -b ${rootDN} uid=${userID}@alumnos.upm.es`;
    if (userID.includes('@upm.es')) {
      command = `ldapsearch -H ldap://${host}:${port} -D uid=${userID},${rootDN} -w ${pwd} -b ${rootDN} uid=${userID}`;
    }
    try {
      const { stdout, stderr } = await exec(command);
    } catch (err) {
      console.log('CATCH!!');
      if (!err) throw new Error('Unexpected Error undefined');
      const { code, stdout, stderr } = err;
      if (code === 32 && stderr === '' && stdout.includes('numResponses: 1')) {
        return {
          success: true,
          message: 'Access granted',
        };
      }
      if (code === 49 && stdout === '' && stderr.includes('Invalid credentials')) {
        const errorCredentials = {
          success: false,
          status: 409,
          message: 'Invalid credentials',
        };
        throw errorCredentials;
      }
      const error = {
        success: false,
        status: 500,
        message: err,
      };      
      throw error;
    }
  }
}

module.exports = AuthLDAP;
