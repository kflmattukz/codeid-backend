import 'dotenv/config'
import express from "express";
import cors from "cors";
import compress from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import models,{sequelize} from "./models/init-models";
import routes from './Routes/indexRoutes'
import { use } from 'passport';

const port = process.env.PORT || 3000;
const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(helmet());
app.use(compress());
app.use(cors());
app.use(async(req,res,next)=> {
    req.context = {models};
    next();
});

app.use('/regions',routes.RegRoute)
app.use('/auths',routes.UsrRoute)
app.use('/countries',routes.CtsRoute)
app.use('/locations',routes.locationRoute)
app.use('/departments',routes.departmentRoute)
app.use('/employees',routes.employeeRoute)
app.use('/jobs',routes.jobRoute)
app.use('/jh',routes.jhRoute)
app.use('/images',express.static('images'))

const dropDatabaseSync = false

sequelize.sync({force : dropDatabaseSync}).then(async()=>{
    if (dropDatabaseSync) {
        console.log("Database do not drop");
    }
    app.listen(port,()=>{console.log('Server is listening on port '+port)})
})

export default app