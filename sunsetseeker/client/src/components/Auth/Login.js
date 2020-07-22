export default class Login extends Component {
    state = {
      username: "",
      password: "",
      message: "",
    };
  
    handleChange = (event) => {
      const { name, value } = event.target;
  
      this.setState({
        [name]: value,
      });
    };
};