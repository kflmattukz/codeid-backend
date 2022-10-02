import { sequelize } from "../models/init-models"
import _ from 'lodash'

const findAll = async (req, res) => {
    try {
        const jh = await req.context.models.job_history.findAll()
        return res.send(jh)
    } catch (error) {
        return res.status(404).send(error)
    }
}
const findOne = async (req, res) => {
    try {
        const jh = await req.context.models.job_history.findOne({
            where: { employee_id: req.params.id, job_id: req.params.jid }
        })
        return res.send(jh)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const create = async (req, res) => {
    try {
        const jh = await req.context.models.job_history.create({
            employee_id: req.body.employee_id,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            job_id: req.body.job_id,
            deparment_id: req.body.deparment_id
        })
            return res.send(jh)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const update = async (req, res) => {
    const updateJh = {
        employee_id: req.body.employee_id,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        job_id: req.body.job_id,
        deparment_id: req.body.deparment_id
    }
    updateJh = _.pickBy(updateJh, _.identity);
    try {
        if (req.file) {
            const jh = await req.context.models.job_history.update(updateJh, { returning: true, where: { employee_id: req.params.id, jo_id:  req.params.jid}})
            return res.send(jh)
        }
    } catch (error) {
        return res.status(404).send(error)
    }
}

const deleted = async (req, res) => {
    try {
        const jh = await req.context.models.job_history.destroy({
            where: { employee_id: req.params.id , job_id: req.params.jid }
        })
        return res.send('delete ' + jh + ' rows')
    } catch (error) {
        return res.status(404).send(error)
    }
}

const querySQL = async (req, res) => {
    try {
        await sequelize.query('SELECT * from job_history where employee_id = :employeeId && job_id = :jobId',
            { replacements: { employeeId: req.params.id, jobId: req.params.jid }, type: sequelize.QueryTypes.SELECT })
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