// import { Component } from "react";
// export default class SignUpForm extends Component {
//   // Classes are not used anymore in React. This is for you to learn legacy code
//   // Below is old school way of declaring your state object. This is similar to how other OOP programming languages work.
//   // constructor() {
//   //   this.state = {
//   //     name: "",
//   //     email: "",
//   //     password: "",
//   //     confirm: "",
//   //     error: "",
//   //   };
//   // }
//   // More modern way of writing state object
//   state = {
//     name: "",
//     email: "",
//     password: "",
//     confirm: "",
//     error: "",
//   };
//   // The object passed to setState is merged with the current state object
//   handleChange = (event) => {
//     // e or evt or event
//     // console.log(event.target)
//     this.setState({
//       // email: 'teo@teo.com
//       // password: "****"
//       [event.target.name]: event.target.value,
//     });
//   };
//   handleSubmit = (e) => {
//     e.preventDefault();
//   };
//   render() {
//     const disable = this.state.password !== this.state.confirm;
//     return (
//       <div>
//         <div className="form-container">
//           <form autoComplete="off" onSubmit={this.handleSubmit}>
//             <label>Name</label>
//             <input
//               type="text"
//               name="name"
//               value={this.state.name}
//               onChange={this.handleChange}
//             //   required
//             />
//             <label>Email</label>
//             <input
//               type="email"
//               name="email"
//               value={this.state.email}
//               onChange={this.handleChange}
//             //   required
//             />
//             <label>Password</label>
//             <input
//               type="password"
//               name="password"
//               value={this.state.password}
//               onChange={this.handleChange}
//             //   required
//             />
//             <label>Confirm</label>
//             <input
//               type="password"
//               name="confirm"
//               value={this.state.confirm}
//               onChange={this.handleChange}
//             //   required
//             />
//             <button type="submit" >
//               SIGN UP
//             </button>
//           </form>
//         </div>
//         <p className="error-message">&nbsp;{this.state.error}</p>
//       </div>
//     );
//   }
// }
// Refactor to Functional Component
import { useState } from "react";
import { signUp } from '../../utilities/users-service'

const SignUpForm = ({ setUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // setFormData(prevFormData => {
    //     return (
    //         {
    //             ...prevFormData,
    //             [name] : value
    //         }
    //     )
    // })
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { ...formData };
      delete userData.confirm;
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await signUp(userData);

      setUser(user)
    } catch (error) {
      // An error has occurred
      setError("Sign Up Failed - Try Again");
    }
  };
  const disable = formData.password !== formData.confirm;
  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Confirm</label>
          <input
            type="password"
            name="confirm"
            value={formData.confirm}
            onChange={handleChange}
            required
          />
          <button type="submit">SIGN UP</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
};
export default SignUpForm;