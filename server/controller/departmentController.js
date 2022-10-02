import { sequelize } from "../models/init-models"
import _ from 'lodash'

const findAll = async (req, res) => {
    try {
        const department = await req.context.models.departments.findAll({
            // attributes: ["department_name","manager_id","location_id"],
            // include: [{
            //     all:false,
            //     model: req.context.models.employees,
            //     as: 'employees'
            // }]
        })
        return res.send(department)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const findOne = async (req, res) => {
    try {
        const department = await req.context.models.departments.findOne({ where: { department_id: req.params.id } })
        res.send(department)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const create = async (req, res) => {
    try {
        const department = await req.context.models.departments.create({
        department_name: req.body.department_name,
        manage_id: req.body.manage_id,
        location_id: req.body.location_id
        })
        return res.send(department)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const update = async (req, res) => {
    const updateDepartment = {
        department_name: req.body.department_name,
        manage_id: req.body.manage_id,
        location_id: req.body.location_id
    }
    updateDepartment = _.pickBy(updateDepartment, _.identity);
    try {
        if (req.file) {
            const department = await req.context.models.departments.update(updateDepartment, { returning: true, where: { department_id: req.params.id } })
            return res.send(department)
        }
    } catch (error) {
        return res.status(404).send(error)
    }
}

const deleted = async (req, res) => {
    try {
        const department = await req.context.models.departments.destroy({
            where: { department_id: req.params.id }
        })
        return res.send('delete ' + department + ' rows')
    } catch (error) {
        return res.status(404).send(error)
    }
}

const querySQL = async (req, res) => {
    try {
        await sequelize.query('SELECT * from departments where department_id = :departmentId',
            { replacements: { deparmentId: req.params.id }, type: sequelize.QueryTypes.SELECT })
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