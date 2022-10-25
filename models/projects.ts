import { Schema, model, models } from "mongoose"

const ProjectSchema = new Schema({
  empId: {
    type: String,
    required: [true, "Please enter employee ID"],
  },
  empName: {
    type: String,
    required: [true, "Please enter employee name"],
  },
  purchaseOrderNumber: {
    type: String,
    required: [true, "Please enter purchase order number"],
  },
  salesOrderNumber: {
    type: String,
    required: [true, "Please enter sales order number"],
  },
  projectName: {
    type: String,
    required: [true, "Please enter project name"],
  },
  startDate: {
    type: String,
    required: [true, "Please enter project start date"],
  },
  endDate: {
    type: String,
    required: [true, "Please enter project end date"],
  },
})

const Project = models.Project || model("Project", ProjectSchema)

export default Project
