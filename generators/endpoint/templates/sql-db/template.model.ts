import Sequelize from "sequelize";
import sequelize from "../../../<%= database %>";

// Sequelize schema like usual
let <%= modelname %> = sequelize.define("<%= fname %>", {
  name: {type: Sequelize.STRING},
  info: {type: Sequelize.STRING}
});

// export default using es6 to import in other files
export default <%= modelname %>;