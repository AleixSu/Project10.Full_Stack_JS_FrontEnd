import './fieldForm.css'

export const fieldForm = ({ type = 'text', placeholder, required = true }) => {
  return `      <div class="fileForm">
           <input type="${type}" placeholder="${placeholder}"required="${required}">
       </div>`
}
