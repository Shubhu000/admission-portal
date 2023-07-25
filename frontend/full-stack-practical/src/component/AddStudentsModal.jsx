import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchStudents, registerStudent } from "../reducers/StudentSlice";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { StudentValidation } from "../validation";

const AddStudents = ({ show, handleClose }) => {
  const [addStudent, setAddStudent] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dob: "",
    address: "",
    motherToungue: "",
    hscMarks: 0,
    photo: "",
    agreedToTems: false,
    stream: "",
    birthPlace: "",
  });
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddStudent({
      ...addStudent,
      [name]: value,
    });

    setErrors((error) => {
      let errorNew = { ...error };
      delete errorNew[name];
      return errorNew;
    });
  };
  const handleImage = (e) => {
    const input = e.target;
    const imageObj = e.target.files;
    const upload_file = imageObj;
    const fileExtention = imageObj[0]?.name.split(".");
    const fsize = upload_file[0]?.size;

    if (
      !imageObj ||
      !fileExtention ||
      !fsize ||
      !fileExtention.length ||
      !fileExtention[1]
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        photo: "Image is required",
      }));
      setImage("");
      return;
    }

    const file = Math.round(fsize / 1024);
    if (file >= 10000) {
      Toast("error", "File too Big, please select a file less than 10MB");
      input.value = "";
      if (!/safari/i.test(navigator.userAgent)) {
        input.type = "";
        input.type = "file";
      }
      setImage("");
    } else {
      const { name } = e.target;
      setImage(e.target.files[0]);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "", // Clear the validation error for photo
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      firstName: addStudent.firstName,
      middleName: addStudent.middleName,
      lastName: addStudent.lastName,
      gender: addStudent.gender,
      dob: addStudent.dob,
      address: addStudent.address,
      motherToungue: addStudent.motherToungue,
      hscMarks: addStudent.hscMarks,
      photo: image,
      agreedToTems: addStudent.agreedToTems,
      stream: addStudent.stream,
      birthPlace: addStudent.birthPlace,
    };

    const error = StudentValidation(payload);
    if (!image) errors.photo = "Image is required";
    if (Object.keys(error).length) {
      setErrors(error);
      return;
    }

    const formData = new FormData();
    formData.append("firstName", addStudent.firstName);
    formData.append("middleName", addStudent.middleName);
    formData.append("lastName", addStudent.lastName);
    formData.append("gender", addStudent.gender);
    formData.append("dob", addStudent.dob);
    formData.append("address", addStudent.address);
    formData.append("motherToungue", addStudent.motherToungue);
    formData.append("hscMarks", addStudent.hscMarks);
    formData.append("agreedToTems", addStudent.agreedToTems);
    formData.append("stream", addStudent.stream);
    formData.append("birthPlace", addStudent.birthPlace);
    formData.append("photo", image);

    const res = await dispatch(registerStudent(formData));
    const success = res.type === "clerk/registerStudent/fulfilled";
    if (!res.payload) {
      return;
    }
    if (res?.payload?.status === 200) {
      navigate("/");
      handleClose();
    }
  };
  return (
    <main className="form-signin x">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Addmission Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-sm-6 form-floating form-group">
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Shubham"
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="floatingInput">First Name</label>
                <p className="text-danger">{errors.firstName}</p>
              </div>
              <div className="col-sm-6 form-floating form-group">
                <input
                  type="text"
                  name="middleName"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Hiteshbhai"
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="floatingInput">Middle Name</label>
                <p className="text-danger">{errors.middleName}</p>
              </div>
              <div className="col-sm-6 form-floating form-group">
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Damania"
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="floatingInput">Last Name</label>
                <p className="text-danger">{errors.lastName}</p>
              </div>
              <div className="col-sm-6 form-floating form-group">
                <select
                  name="gender"
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => handleChange(e)}
                  value={addStudent.gender}
                >
                  <option selected>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <p className="text-danger">{errors.gender}</p>
              </div>
              <div className="col-sm-6 form-floating form-group">
                <textarea
                  type="text"
                  name="address"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="floatingInput">Address</label>
                <p className="text-danger">{errors.address}</p>
              </div>
              <div className="col-sm-6 form-floating form-group">
                <select
                  name="motherToungue"
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => handleChange(e)}
                  value={addStudent.motherToungue}
                >
                  <option selected>Select Mother Tongue</option>
                  <option value="Gujarati">Gujarati</option>
                  <option value="Hindi">Hindi</option>
                  <option value="English">English</option>
                </select>
                <p className="text-danger">{errors.motherToungue}</p>
              </div>
              <div className="col-sm-6 form-floating form-group">
                <input
                  type="number"
                  name="hscMarks"
                  className="form-control"
                  id="floatingInput"
                  placeholder="65%"
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="floatingInput">HSC Marks</label>
                <p className="text-danger">{errors.hscMarks}</p>
              </div>
              <div className="col-sm-6 form-floating form-group">
                <input
                  type="text"
                  name="stream"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Computer"
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="floatingInput">Stream</label>
                <p className="text-danger">{errors.stream}</p>
              </div>{" "}
              <div className="col-sm-6 form-floating form-group">
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  id="floatingInput"
                  placeholder="2000-11-11"
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="floatingInput">Date of birth</label>
                <p className="text-danger">{errors.dob}</p>
              </div>{" "}
              <div className="col-sm-6 form-floating form-group">
                <input
                  type="text"
                  name="birthPlace"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Surat"
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="floatingInput">Birth Place</label>
                <p className="text-danger">{errors.birthPlace}</p>
              </div>
              <div className="col-sm-6 form-floating form-group">
                <input
                  onChange={(e) => handleImage(e)}
                  name="photo"
                  className="form-control"
                  type="file"
                  id="formFile"
                />
                <p className="text-danger">{errors.photo}</p>
              </div>
            </div>
            <div className="checkbox mb-3">
              <label>
                <input
                  onChange={(e) => handleChange(e)}
                  name="agreedToTems"
                  type="checkbox"
                  value={true}
                />{" "}
                Agreed Terms
              </label>
              <p className="text-danger">{errors.agreedToTems}</p>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Add Student
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </main>
  );
};

export default AddStudents;
