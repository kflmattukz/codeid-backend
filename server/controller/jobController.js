import { sequelize } from "../models/init-models"
import _ from 'lodash'

const findAll = async (req, res) => {
    try {
        const job = await req.context.models.jobs.findAll()
        return res.send(job)
    } catch (error) {
        return res.status(404).send(error)
    }
}
const findOne = async (req, res) => {
    try {
        const job = await req.context.models.jobs.findOne({
            where: { job_id: req.params.id.toUpperCase() }
        })
        return res.send(job)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const create = async (req, res) => {
    try {
        const job = await req.context.models.jobs.create({
            job_id: req.body.job_id,
            job_title: req.body.job_title,
            min_salary: req.body.min_salary,
            max_salary: req.body.max_salary
        })
            return res.send(job)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const update = async (req, res) => {
    try {
        let updateJob = {
            job_id: req.body.job_id,
            job_title: req.body.job_title,
            min_salary: req.body.min_salary,
            max_salary: req.body.max_salary
        }
        updateJob = _.pickBy(updateJob, _.identity);
        const job = await req.context.models.jobs.update(updateJob, { returning: true, where: { job_id: req.params.id.toUpperCase() } })
        return res.send(job)
        
    } catch (error) {
        return res.status(404).send(error)
    }
}

const deleted = async (req, res) => {
    try {
        const job = await req.context.models.jobs.destroy({
            where: { job_id: req.params.id.toUpperCase() }
        })
        return res.send('delete ' + job + ' rows')
    } catch (error) {
        return res.status(404).send(error)
    }
}

const querySQL = async (req, res) => {
    try {
        await sequelize.query('SELECT * from jobs where job_id = :jobId',
            { replacements: { jobId: req.params.id.toUpperCase() }, type: sequelize.QueryTypes.SELECT })
            .then(result => {
                return res.send(result)
            })
    } catch (error) {
        return res.status(404).send(error)
    }
}

export default {
    findAll,
    findOne,
    create,
    update,
    deleted,
    querySQL
}