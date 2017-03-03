/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

export default function seed(env?: string) : void {

  // Insert seeds below
  switch (env) {
    case "development":
      // code...
      break;
    case "test":
      // code...
      break;
    default:
      // code... for production and others
      break;
  }

}
