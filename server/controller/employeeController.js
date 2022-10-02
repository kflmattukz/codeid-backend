import { sequelize } from "../models/init-models"
import _ from 'lodash'

const findAll = async (req, res) => {
    try {
        const employee = await req.context.models.employees.findAll({
            attributes: ['first_name','last_name','email','phone_number','hire_date','job_id','salary','department_id'],
            include: [{
                all:false,
                model: req.context.models.job_history,
                as: 'job_histories'
            }]
        })
        return res.send(employee)
    } catch (error) {
        return res.status(404).send(error)
    }
}
const findOne = async (req, res) => {
    try {
        const employee = await req.context.models.employees.findOne({
            where: { employee_id: req.params.id }
        })
        return res.send(employee)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const history = async (req, res) => {
    try {
        const employee = await req.context.models.employees.findOne({
            attributes: ['first_name','last_name','email','phone_number','hire_date','job_id','salary','department_id'],
            where: { employee_id: req.params.id },
            include: [{
                all:false,
                model: req.context.models.job_history,
                where: { employee_id: req.params.id },
                as: 'job_histories'
            }]
        })
        return res.send(employee)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const create = async (req, res) => {
    try {
        if (req.files) {
            const employee = await req.context.models.employees.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                phone_number: req.body.phone_number,
                hire_date: req.body.hire_date,
                job_id: req.body.job_id,
                salary: req.body.salary,
                commision_pct: req.body.commision_pct,
                manager_id: req.body.manage_id,
                department_id: req.body.department_id,
                xemp_id: req.body.xemp_id
            })
            return res.send(employee)
        }
    } catch (error) {
        return res.status(404).send(error)
    }
}

const update = async (req, res) => {
    const updateEmployee = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        hire_date: req.body.hire_date,
        job_id: req.body.job_id,
        salary: req.body.salary,
        commision_pct: req.body.commision_pct,
        manager_id: req.body.manage_id,
        department_id: req.body.department_id,
        xemp_id: req.body.xemp_id
    }
    updateEmployee = _.pickBy(updateEmployee, _.identity);
    try {
        if (req.file) {
            const employee = await req.context.models.employees.update(updateEmployee, { returning: true, where: { employee_id: req.params.id } })
            return res.send(employee)
        }
    } catch (error) {
        return res.status(404).send(error)
    }
}

const deleted = async (req, res) => {
    try {
        const employee = await req.context.models.employees.destroy({
            where: { department_id: req.params.id }
        })
        return res.send('delete ' + employee + ' rows')
    } catch (error) {
        return res.status(404).send(error)
    }
}

const querySQL = async (req, res) => {
    try {
        await sequelize.query('SELECT * from employees where employee_id = :employeeId',
            { replacements: { employeeId: req.params.id }, type: sequelize.QueryTypes.SELECT })
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
    history,
    deleted,
    querySQL
}