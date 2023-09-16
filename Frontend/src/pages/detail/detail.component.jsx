import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DetailGetAPI, DetailPatchAPI, DetailDeleteAPI } from "../../util/API";
import Button from "../../components/Button/button.component";
import { mapper } from "../../util/util";
import AddDisplay from "../../components/addDisplay/addDisplay.component";
import { useOutletContext } from "react-router-dom";
import { useParams } from 'react-router-dom'
const Detail = () => {
  const SkeletonHeaders = [
    "Set up your account: Step 1/3 - Basic information",
    "Set up your account: Step 2/3 - Qualification",
    "Set up your account: Step 3/3 - Experience"];

  const params = useParams()
  const id = params.id
  const navigate = useNavigate();
  const [setSkeletonHeader] = useOutletContext();
  const [pageCount, setPageCount] = useState(0);
  const [oneCount, setOneCount] = useState(Array(3).fill(0));
  const [addClicked, setAddClicked] = useState(Array(3).fill(-1));
  const [formData, setFormData] = useState();
  const [editedObject, setEditedObject] = useState();
  const [editorToggle, setEditorToggle] = useState(false);
  const [submittable, setSubmittable] = useState(
    Array.from(Array(3), () => {
      return [];
    })
  );
  setSkeletonHeader(SkeletonHeaders[pageCount])
  useEffect(() => {
    const fetchData = async () => {
      await DetailGetAPI(id).then((res) => {
        console.log(res.data)
        const data = new Array();
        const dataLength = new Array();
        data.push([res.data.recruit]);
        dataLength.push(1);
        data.push(res.data.qualification);
        dataLength.push(res.data.qualification.length);
        data.push(res.data.experience);
        dataLength.push(res.data.experience.length);
        setFormData(data);
        setOneCount(dataLength);
      });
    };

    fetchData().catch(console.error);
  }, []);

  console.log(formData);

  const valueReturn = () => {
    if (formData) return formData[pageCount][oneCount[pageCount]];
  };
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (valueReturn()) {
      formData[pageCount][oneCount[pageCount]] = {
        ...valueReturn(),
        [name]: value,
      };
    } else {
      formData[pageCount].push({ ...valueReturn(), [name]: value });
    }
    setFormData([...formData]);
  };
  const FileHandler = ({ target }) => {
    const { name, files } = target;
    const fileForm = new FormData();

    fileForm.append(name, files[0]);
    if (valueReturn()) {
      formData[pageCount][oneCount[pageCount]] = {
        ...valueReturn(),
        [name]: files[0],
      };
    } else {
      formData[pageCount].push({ ...valueReturn(), [name]: files[0] });
    }

    setFormData([...formData]);
  };

  const Form1Object = [
    {
      mapper_type: "header",
      text: "Personal information",
    },
    {
      mapper_type: "date",
      label_name: "Birth Date",
      name: "date_of_birth",
      onChange: onChangeHandler,
      value: valueReturn()
        ? valueReturn()["date_of_birth"]
        : editedObject
        ? editedObject["date_of_birth"]
        : "",
    },
    {
      mapper_type: "select",
      label_name: "Marital Status",
      name: "marital_status",
      default_name: "Status",
      selected: valueReturn()
        ? valueReturn()["marital_status"]
        : editedObject
        ? editedObject["marital_status"]
        : "",
      selected_array: ["married", "single", "divorced", "widow/er"],
      onChange: onChangeHandler,
    },
    {
      mapper_type: "radio",
      label_name: "Gender",
      name: "gender",
      choices: ["Male", "Female"],
      onChange: onChangeHandler,
      value: valueReturn()
        ? valueReturn()["gender"]
        : editedObject
        ? editedObject["gender"]
        : "",
    },
    {
      mapper_type: "header",
      text: "File",
    },
    {
      mapper_type: "file",
      label_name: "Resume'",
      name: "resume",
      type: "flex",
      onChange: FileHandler,
      val:
        valueReturn() && valueReturn()["resume"]
          ? valueReturn()["resume"].name
          : editedObject
          ? editedObject["resume"]
          : "",
    },
    {
      mapper_type: "file",
      label_name: "ID",
      name: "id_photo",
      type: "flex",
      onChange: FileHandler,
      val:
        valueReturn() && valueReturn()["id_photo"]
          ? valueReturn()["id_photo"].name
          : editedObject
          ? editedObject["id_photo"]
          : "",
    },
    {
      mapper_type: "file",
      label_name: "Photograph",
      name: "photograph",
      type: "flex",
      onChange: FileHandler,
      val:
        valueReturn() && valueReturn()["photograph"]
          ? valueReturn()["photograph"].name
          : editedObject
          ? editedObject["photograph"]
          : "",
    },

    {
      mapper_type: "header",
      text: "Address",
    },
    {
      mapper_type: "select",
      label_name: "Region",
      default_name: "Region",
      name: "region",
      selected_array: [
        "Addis Ababa",
        "Amhara",
        "Tigray",
        "Oromia",
        "Somalia",
        "Afar",
        "SSNNN",
      ],
      selected: valueReturn()
        ? valueReturn()["region"]
        : editedObject
        ? editedObject["region"]
        : "",
      onChange: onChangeHandler,
    },
    {
      mapper_type: "text",
      label_name: "Zone",
      name: "zone",
      onChange: onChangeHandler,
      value: valueReturn()
        ? valueReturn()["zone"]
        : editedObject
        ? editedObject["zone"]
        : "",
    },
    {
      mapper_type: "text",
      label_name: "City",
      name: "city",
      onChange: onChangeHandler,
      value: valueReturn()
        ? valueReturn()["city"]
        : editedObject
        ? editedObject["city"]
        : "",
    },
  ];
  const Form2Object = [
    {
      mapper_type: "header",
      text: "Qualifications",
    },
    {
      mapper_type: "text",
      label_name: "Institution",
      name: "institution",
      onChange: onChangeHandler,
      value: valueReturn()
        ? valueReturn()["institution"]
        : editedObject
        ? editedObject["institution"]
        : "",
      required: true,
    },
    {
      mapper_type: "select",
      label_name: "Types",
      name: "qualification_type",
      default_name: "Status",
      selected: valueReturn()
        ? valueReturn()["qualification_type"]
        : editedObject
        ? editedObject["qualification_type"]
        : "",
      selected_array: [
        "Grade 8",
        "Grade 10",
        "Grade 12",
        "Diploma",
        "Award",
        "BSc",
        "MSc",
      ],
      onChange: onChangeHandler,
      required: true,
    },
    {
      mapper_type: "text",
      label_name: "Department",
      name: "department",
      onChange: onChangeHandler,
      value: valueReturn()
        ? valueReturn()["department"]
        : editedObject
        ? editedObject["department"]
        : "",
      required: true,
    },
    {
      mapper_type: "text",
      label_name: "Grade",
      name: "grade",
      type: "number",
      onChange: onChangeHandler,
      value: valueReturn()
        ? valueReturn()["grade"]
        : editedObject
        ? editedObject["grade"]
        : "",
      required: true,
    },
    {
      mapper_type: "date",
      label_name: "State Date",
      name: "start_date",
      onChange: onChangeHandler,
      value: valueReturn()
        ? valueReturn()["start_date"]
        : editedObject
        ? editedObject["start_date"]
        : "",
      required: true,
    },
    {
      mapper_type: "date",
      label_name: "Date Received",
      name: "date_received",
      onChange: onChangeHandler,
      value: valueReturn()
        ? valueReturn()["date_received"]
        : editedObject
        ? editedObject["date_received"]
        : "",
      required: true,
    },
    {
      mapper_type: "file",
      label_name: "Transcript",
      name: "transcript",
      type: "flex",
      onChange: FileHandler,
      val:
        valueReturn() && valueReturn()["transcript"]
          ? valueReturn()["transcript"].name
          : editedObject
          ? editedObject["transcript"]
          : "",
    },
    {
      mapper_type: "file",
      label_name: "Certificate",
      name: "certificate",
      type: "flex",
      onChange: FileHandler,
      val:
        valueReturn() && valueReturn()["certificate"]
          ? valueReturn()["certificate"].name
          : editedObject
          ? editedObject["certificate"]
          : "",
    },
  ];
  const Form3Object = [
    {
      mapper_type: "header",
      text: "Add Employment History",
    },
    {
      mapper_type: "text",
      label_name: "Employer",
      name: "employer",
      onChange: onChangeHandler,
      value: valueReturn() ? valueReturn()["employer"] : "",
      required: true,
    },
    {
      mapper_type: "text",
      label_name: "Job Category",
      name: "job_category",
      onChange: onChangeHandler,
      value: valueReturn() ? valueReturn()["job_category"] : "",
      required: true,
    },
    {
      mapper_type: "text",
      label_name: "Job Title",
      name: "job_title",
      onChange: onChangeHandler,
      value: valueReturn() ? valueReturn()["job_title"] : "",
      required: true,
    },
    {
      mapper_type: "date",
      label_name: "Start Date",
      onChange: onChangeHandler,
      name: "start_date",
      value: valueReturn() ? valueReturn()["start_date"] : "",
      required: true,
    },
    {
      mapper_type: "date",
      label_name: "End Date",
      onChange: onChangeHandler,
      name: "end_date",
      value: valueReturn() ? valueReturn()["end_date"] : "",
      required: true,
    },
    {
      mapper_type: "file",
      label_name: "Experience letter",
      type: "flex",
      name: "experience_letter",
      onChange: FileHandler,
      val:
        valueReturn() && valueReturn()["experience_letter"]
          ? valueReturn()["experience_letter"].name
          : "",
    },
  ];
  const pages = [Form1Object, Form2Object, Form3Object];
  const testContinueHandler = ({ target }) => {
    const { value } = target;
    if (value == "finish") {
      submittable.forEach((item, index) => {
        item.forEach((item1, index1) => {
          if (!item1.has("serializer")) {
            switch (index) {
              case 0:
                item1.append("serializer", "recruit");
                break;
              case 1:
                item1.append("serializer", "qualification");
                break;
              case 2:
                item1.append("serializer", "experience");
                break;
              default:
                throw Error("unExpected index");
            }
          }

          DetailPatchAPI(id, item1).then((res) => console.log(res));
          console.log(...item1);
          console.log({ submittable });
          navigate("/home");
        });
      });
    }

    const page = pageCount + 1;
    setPageCount(page);
    setEditorToggle(false);
  };
  const addDisplayDeleteHandler = (e, dex) => {
    let object = {};
    const deletedArray = formData[pageCount].filter((item, index) => {
      if (index == dex) object = item;
      if (index != dex) return item;
    });
    const deletedSubmitted = submittable[pageCount].filter((item, index) => {
      if (index != dex) return item;
    });
    if (object.id) {
      const notifyAPI = new FormData();

      notifyAPI.append("pk", object.id);
      notifyAPI.append("deletable", true);
      deletedSubmitted.push(notifyAPI);
    }

    formData[pageCount] = deletedArray;
    submittable[pageCount] = deletedSubmitted;
    setFormData([...formData]);
    setSubmittable([...submittable]);
    addClicked[pageCount] = addClicked[pageCount] - 1;
    setAddClicked([...addClicked]);
  };

  const editDisplayHandler = (e, ind) => {
    console.log("editor Clicked");
    setEditedObject(formData[pageCount][ind]);
    const editedArray = formData[pageCount].filter((item, index) => {
      if (ind !== index) return item;
    });
    formData[pageCount] = editedArray;
    setFormData([...formData]);

    oneCount[pageCount] = oneCount[pageCount] - 1;
    setOneCount([...oneCount]);
    setEditorToggle(true);
  };
  const continueClickHandler = async (e) => {
    e.preventDefault();
    console.log("submitted");
    const { target, nativeEvent } = e;
    const form = new FormData(e.target);
    if (editedObject) {
      form.append("pk", editedObject.id);
    }
    formData[pageCount] = formData[pageCount].filter((item, index) => {
      if (index != formData[pageCount].length - 1) return item;
    });
    setFormData([...formData]);

    oneCount[pageCount] = oneCount[pageCount] + 1;

    let obj = {};
    //  form.filter((value,key)=>{

    //  })
    const form1 = new FormData();
    for (const pair of form.entries()) {
      const [key, value] = pair;

      obj = { ...obj, [key]: value };
      if (typeof value == "object" && value.size == 0) {
        continue;
      }
      form1.append(key, value);
    }
    console.log(...form1);

    formData[pageCount].push(obj);

    if (valueReturn()) {
      submittable[pageCount][oneCount[pageCount]] = form1;
    } else {
      submittable[pageCount].push(form1);
    }
    setOneCount([...oneCount]);
    setEditorToggle(false);
    setEditedObject(null);
    setFormData([...formData]);
    setSubmittable([...submittable]);
  };
  const prevClickHandler = (e) => {
    if (pageCount != 0) {
      const page = pageCount - 1;
      setPageCount(page);
    }
  };

  return (
    <div className="registration2-container">
      {oneCount[pageCount] > 0 ? (
        <div className="registration2-registered">
          <div className="addDisplay-header">Registered</div>
          <div className="registration2-addDisplay">
            {formData &&
              formData[pageCount].map(({ id, ...otherProp }, index) => {
                // if (index > addClicked[pageCount]) return;
                return (
                  <AddDisplay
                    item={{ ...otherProp }}
                    index={index}
                    editable={
                      formData[pageCount].length - 1 == index
                        ? editedObject
                        : null
                    }
                    displayDeleteHandler={(e) =>
                      addDisplayDeleteHandler(e, index)
                    }
                    editDisplay={(e) => editDisplayHandler(e, index)}
                    displayDelete={pageCount == 0 ? false : true}
                  />
                );
              })}
          </div>
        </div>
      ) : (
        <></>
      )}
      {editorToggle && (
        <div className="registration2-content">
          <form onSubmit={continueClickHandler} encType="multipart/form-data">
            <div className="registration2-input-container">
              {pages[pageCount].map((item, index) => {
                if (item.mapper_type == "header")
                  return (
                    <div className="registration2-input-header" key={index}>
                      {item.text}
                    </div>
                  );

                return (
                  <div className="registration2-inputs" key={index}>
                    {mapper(item)}
                  </div>
                );
              })}
            </div>

            <div className="registration2-add-button">
              <Button
                buttonType="button-outline"
                id="add"
                Text="Add"
                type="submit"
                value="add"
              />
            </div>
          </form>
        </div>
      )}

      {pageCount != 0 && (
        <div className="detail-addmore-button">
          <Button
            buttonType="button-outline"
            type="button"
            Text="addMore"
            onClick={() => {
              setEditorToggle(true);
            }}
          />
        </div>
      )}
      <div className="registration2-button">
        {!editedObject && pageCount != 0 && (
          <Button
            buttonType="button-next"
            Text="Prev"
            angle="prev"
            type="button"
            clickHandler={prevClickHandler}
          />
        )}
        {!editedObject && (
          <Button
            buttonType="button"
            type="button"
            Text={pageCount == 2 ? "Finish" : "Continue"}
            id="cont"
            value={pageCount == 2 ? "finish" : "continue"}
            onClick={testContinueHandler}
          />
        )}
      </div>
    </div>
  );
};

export default Detail;
