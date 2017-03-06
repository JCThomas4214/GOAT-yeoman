// import * as mongoose from 'mongoose';

// Mongoose Model the typescript way
// create interface to specift the type
// interface I<%= modelname %> extends mongoose.Document {
//   created: Date;
//   name: String;
//   info: String;
// }

// // Mongoose schema like usual
// let <%= modelname %>Schema: mongoose.Schema = new mongoose.Schema({
//   created: {
//     type: Date,
//     default: Date.now
//   },
//   name: String,
//   info: String
// });

// // export default using es6 to import in other files
// export default mongoose.model<I<%= modelname %>>('<%= modelname %>', <%= modelname %>Schema, null, null);