import {useState} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import "./style.css"

export default function DataInput({selectedSeats, seats}) {
  const [buyerName, setBuyerName] = useState("")
  const [buyerCPF, setBuyerCPF] = useState("")

  const seatsIds = selectedSeats.map(selected => selected.id)
  const seatsArr = selectedSeats.map(selected => selected.seat)

  function postData() {
    const currentData = {
      ids: seatsIds,
      name: buyerName,
      cpf: buyerCPF
    }

    const promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", currentData)

    promise.then(() => {console.log("success")})
    promise.catch((err) => {console.error("Deu ruim! ", err.response)})
  }

  // Hook to validate input data, based on "https://felixgerschau.com/react-hooks-form-validation-typescript/" article
  const useForm = (options) => {
    // Vinculate passed initial values to data state (keys and values)
    const [data, setData] = useState(options?.initialValue || {})
    const [errors, setErrors] = useState({})

    const handleChange = (key, sanitizeFn) => (e) => {
      const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value

      setData({...data, [key]: value})

      key === "name" ? setBuyerName(value) : setBuyerCPF(value)

      validateField(key, value)
    }

    const handleSubmit = async (e) => {
      const validations = options?.validations
      let isValid = false;

      if(validations) {
        for(const key in validations) {
          const value = data[key]
          isValid = validateField(key, value)

          console.log("key: ", key)
          console.log("is valid: ", isValid)
        }
      }

      if(isValid) {
        if(options?.onSubmit) {
          options.onSubmit()
        }
      } else {
        e.preventDefault()
      }
    }

    const validateField = (key, value) => {
      const validations = options?.validations

      if(validations) {
        let valid = true
        const newErrors = {}

        const validation = validations[key]

        if(validation?.required?.value && !value) {
          valid = false
          newErrors[key] = validation?.required?.message
        }

        const pattern = validation?.pattern
        if(pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false
          newErrors[key] = pattern.message
        }

        const custom = validation?.custom
        if(custom?.isValid && !custom.isValid(value)) {
          valid = false
          newErrors[key] = custom.message
        }

        if(!valid) {
          setErrors(newErrors)
          return
        } else {
          setErrors({})

          return valid
        }
      }

    }

    return {
      data,
      handleChange,
      handleSubmit,
      errors
    }
  }

  // Set and receive all useForm hook validations, methods, and variables
  const {handleSubmit, handleChange, data, errors} = useForm({
    validations: {
      // Set name input rules for validation (?pattern, ?required, ?custom)
      name: {
        pattern: {
          value: "^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$",
          message: "Not a valid name..."
        },
        required: {
          value: true,
          message: "Please, enter a name..."
        }
      },
      // Set cpf input rules for validation (?pattern, ?required, ?custom)
      cpf: {
        pattern: {
          value: '([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})',
          message: "Insert a valid CPF number..."
        },
        required: {
          value: true,
          message: "Please, enter a valid CPF number (11 numbers only)..."
        }
      }
    },
    // Define what function to be called when the form is submited
    onSubmit: () => postData(),
    // Set which keys and values will be managed by data State
    initialValues: {
      name: '',
      cpf: ""
    }
  })

  return (
    <form onSubmit={handleSubmit} className="data-input">
      <label htmlFor="username">Nome do comprador:
        <input
          placeholder="Digite seu nome..."
          type="text"
          name="username"
          value={data.name}
          onChange={handleChange("name")}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </label>
      <label htmlFor="userCpf">CPF do comprador:
        <input
          placeholder="Digite seu CPF..."
          type="text"
          name="userCpf"
          value={data.cpf}
          onChange={handleChange("cpf")}
        />
        {errors.cpf && <p className="error">{errors.cpf}</p>}
      </label>

      <Link to="/sucesso" onClick={handleSubmit} state={{
        name: buyerName,
        cpf: buyerCPF,
        title: seats.movie.title,
        date: `${seats.name} ${seats.day.date}`,
        seats: seatsArr
      }} >
        <input type="submit" value="Reservar Assento(s)" className="button" />
      </Link>
    </form>
  )
}