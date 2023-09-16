import "./registration2.style.scss";
import Button from "../../../components/Button/button.component";
import { mapper } from "../../../util/util";
import { useState, useEffect } from "react";
import AddDisplay from "../../../components/addDisplay/addDisplay.component";
import { CreateProfileAPI } from "../../../util/API";
import { useOutletContext } from "react-router-dom";

const Registration2 = () => {
  const SkeletonHeaders = [
    "Set up your account: Step 1/3 - Basic information",
    "Set up your account: Step 2/3 - Qualification",
    "Set up your account: Step 3/3 - Experience"];
    const [setSkeletonHeader] = useOutletContext();
  const [pageCount, setPageCount] = useState(0);
  const [oneCount, setOneCount] = useState(Array(3).fill(0));
  const [formData, setFormData] = useState(
    Array.from(Array(3), () => {
      return [];
    })
  );
  const [addClicked, setAddClicked] = useState(Array(3).fill(-1));
  const [submittable, setSubmittable] = useState(
    Array.from(Array(3), () => {
      return [];
    })
  );
  setSkeletonHeader(SkeletonHeaders[pageCount])
  const valueReturn = () => {
    return formData[pageCount][oneCount[pageCount]];
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
      value: valueReturn() ? valueReturn()["date_of_birth"] : "",
    },
    {
      mapper_type: "select",
      label_name: "Marital Status",
      name: "marital_status",
      default_name: "Status",
      selected: valueReturn() ? valueReturn()["marital_status"] : "",
      selected_array: ["married", "single", "divorced"],
      onChange: onChangeHandler,
    },
    {
      mapper_type: "radio",
      label_name: "Gender",
      name: "gender",
      choices: ["Male", "Female"],
      onChange: onChangeHandler,
      value: valueReturn() ? valueReturn()["gender"] : "",
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
      selected: valueReturn() ? valueReturn()["region"] : "",
      onChange: onChangeHandler,
    },
    {
      mapper_type: "text",
      label_name: "Zone",
      name: "zone",
      onChange: onChangeHandler,
      value: valueReturn() ? valueReturn()["zone"] : "",
    },
    {
      mapper_type: "text",
      label_name: "City",
      name: "city",
      onChange: onChangeHandler,
      value: valueReturn() ? valueReturn()["city"] : "",
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
      value: valueReturn() ? valueReturn()["institution"] : "",
      required: true,
    },
    {
      mapper_type: "select",
      label_name: "Types",
      name: "qualification_type",
      default_name: "Status",
      selected: valueReturn() ? valueReturn()["qualification_type"] : "",
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
      value: valueReturn() ? valueReturn()["department"] : "",
      required: true,
    },
    {
      mapper_type: "text",
      label_name: "Grade",
      name: "grade",
      type: "number",
      onChange: onChangeHandler,
      value: valueReturn() ? valueReturn()["grade"] : "",
      required: true,
    },
    {
      mapper_type: "date",
      label_name: "State Date",
      name: "start_date",
      onChange: onChangeHandler,
      value: valueReturn() ? valueReturn()["start_date"] : "",
      required: true,
    },
    {
      mapper_type: "date",
      label_name: "Date Received",
      name: "date_received",
      onChange: onChangeHandler,
      value: valueReturn() ? valueReturn()["date_received"] : "",
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
  const pageChange = ({target}) => {
    if(target.value=="finish"){
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

            CreateProfileAPI(item1).then((res) => console.log(res));
            console.log(...item1);
            console.log({ submittable });
          });
        });
    }

    setTimeout(() => {
      if (pageCount < 2) {
        const page = pageCount + 1;
        setPageCount(page);
      }
    }, 0);
  };
  const continueClickHandler = async (e) => {
    e.preventDefault();
    const { target, nativeEvent } = e;
    const form = new FormData(e.target);
    if (valueReturn()) {
      submittable[pageCount][oneCount[pageCount]] = form;
    } else {
      submittable[pageCount].push(form);
    }

    setSubmittable([...submittable]);
    await addHandler();
    if (nativeEvent.submitter.value=="continue"){
     
      setTimeout(() => {
        if (pageCount < 2) {
          const page = pageCount + 1;
          setPageCount(page);
        }
      }, 0);

    }
    // switch (nativeEvent.submitter.value) {
    //   case "continue":
    //     await pageChange();
    //     break;
    //   case "add":
      
    //     break;
    //  
    //   default:
    //     return;
    // }
  };
  const prevClickHandler = (e) => {
    if (pageCount != 0) {
      const page = pageCount - 1;
      setPageCount(page);
    }
  };

  const addHandler = () => {
    if (formData[pageCount].length - 2 == addClicked[pageCount]) {
      oneCount[pageCount] = oneCount[pageCount] + 1;
      setOneCount([...oneCount]);

      addClicked[pageCount] = addClicked[pageCount] + 1;
      setAddClicked([...addClicked]);
    }
  };
  const addDisplayDeleteHandler = (e, dex) => {
    const deletedArray = formData[pageCount].filter((item, index) => {
      if (index != dex) return item;
    });
    const deletedSubmitted = submittable[pageCount].filter((item, index) => {
      if (index != dex) return item;
    });
    formData[pageCount] = deletedArray;
    submittable[pageCount] = deletedSubmitted;
    setFormData([...formData]);
    setSubmittable([...submittable]);
    addClicked[pageCount] = addClicked[pageCount] - 1;
    setAddClicked([...addClicked]);
  };
  console.log({submittable});
  return (
    <div className="registration2-container">
      {addClicked[pageCount] >= 0 && formData[pageCount].length > 0 ? (
        <div className="registration2-registered">
          <div className="addDisplay-header">Registered</div>
          <div className="registration2-addDisplay">
            {formData[pageCount].map((item, index) => {
              if (index > addClicked[pageCount]) return;
              return (
                <AddDisplay
                  item={formData[pageCount][index]}
                  index={index}
                  onClick={(e) => addDisplayDeleteHandler(e, index)}
                  displayDelete={pageCount == 0 ? false : true}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}

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
            {pageCount !=0 && <div className="registration2-add-button">
              <Button
                buttonType="button-outline"
                id="add"
                Text={"Add"}
                type="submit"
                value="add"
              />
            </div>}

            {pageCount==0 &&
               <div className="registration2-button">
               <Button
                 buttonType="button"
                 id="add"
                 Text="Continue"
                 type="submit"
                 value="continue"
                 
               />
             </div>
            }

        
        </form>
      </div>
     
      {pageCount != 0 &&  <div className="registration2-button">
            
              <Button
                buttonType="button-next"
                Text="Perv"
                angle="prev"
                clickHandler={prevClickHandler}
              />
            
            <Button
              buttonType="button"
              type="button"
              Text={pageCount == 2 ? "Finish" : "Continue"}
              id="cont"
              value={pageCount == 2 ? "finish" : "continue"}
              clickHandler={pageChange}
            />
          
          </div>
            }
    </div>
  );
};

export default Registration2;
