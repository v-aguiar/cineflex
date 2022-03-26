import {useState} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import "./style.css"

export default function DataInput({selectedSeats, seats}) {
  const [buyerName, setBuyerName] = useState("")
  const [buyerCPF, setBuyerCPF] = useState("")

  let seatsIds = selectedSeats.map(selected => selected.id)
  let seatsArr = selectedSeats.map(selected => selected.seat)

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

  /** 
  *  Hook to validate multiple input data, based on "https://felixgerschau.com/react-hooks-form-validation-typescript/" article
  *  adapted to fit Cineflex application requirements and necessary validations
  **/
  const useForm = (options) => {
    // Vinculate passed initial values to data state (keys and values)
    const [data, setData] = useState(options?.initialValue || {})
    const [errors, setErrors] = useState({})

    const handleChange = (key, sanitizeFn) => (e) => {
      const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value

      setData({...data, [key]: value})

      if(key === "name") {
        setBuyerName(value)
      } else {
        setBuyerCPF(value)
      }

      validateField(key, value)
    }

    const handleSubmit = async (e) => {
      const validations = options?.validations
      let isValid = true;

      if(validations) {
        for(const key in validations) {
          const value = data[key]
          isValid = isValid && ((validateField(key, value) === undefined) ? false : validateField(key, value))
        }
      }

      // Validate if at least one seat is selected
      if(seatsArr.length === 0) {
        isValid = false
        setErrors({...errors, seats: "Escolha, pelo menos, um assento!"})
      }

      // Only submit if all validations are ok
      if(isValid === true) {
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
      handleChange,
      handleSubmit,
      errors
    }
  }

  // Set and receive all useForm hook validations, methods, and variables
  const {handleSubmit, handleChange, errors} = useForm({
    validations: {
      // Set name input rules for validation (?pattern, ?required, ?custom)
      name: {
        pattern: {
          // Regexp to validate names (international names included)
          value: "^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$",
          message: "Insira um nome válido..."
        },
        required: {
          value: true,
          message: "Insira um nome válido..."
        }
      },
      // Set cpf input rules for validation (?pattern, ?required, ?custom)
      cpf: {
        pattern: {
          // Regexp to validate CPF number with or without special characters
          value: '([0-9]{3}[0-9]{3}[0-9]{3}[0-9]{2})',
          message: "Insira um CPF válido (Apenas 11 números)..."
        },
        required: {
          value: true,
          message: "Insira um CPF válido (Apenas 11 números)..."
        }
      }
    },
    // Define what function to be called when the form is submited
    onSubmit: () => postData(),
    // Set which keys and values will be managed by data State
    initialValues: {
      name: buyerName,
      cpf: buyerCPF
    }
  })

  return (
    <form onSubmit={handleSubmit} className="data-input">
      <label htmlFor="username">Nome do comprador:
        <input
          required
          placeholder="Digite seu nome..."
          type="text"
          name="username"
          value={buyerName}
          onChange={handleChange("name")}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </label>
      <label htmlFor="userCpf">CPF do comprador:
        <input
          required
          placeholder="Digite seu CPF..."
          type="text"
          name="userCpf"
          maxLength={11}
          value={buyerCPF}
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
        {errors.seats && <p className="error">{errors.seats}</p>}
      </Link>
    </form>
  )
}