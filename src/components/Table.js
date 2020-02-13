import React, {useState} from 'react';
import "./css/bootstrap.min.css";
import "./css/main.css";
import "./css/util.css";

function Table(props) {

  const [] = useState("")

  const [clinicalStatus, setClinicalStatus] = useState();
  const [dateRecorded, setDateRecorded] = useState();
  const [verificationStatus, setVerificationStatus] = useState();
  const [resource, setResource] = useState();

  const {
    heads,
    list,
    resources
  } = props;

  return (
    <div class="limiter">

      <div>

        <select value={clinicalStatus} onChange={e => {
          e.preventDefault();
          setClinicalStatus(e.target.value)
        }}>
          <option value=""></option>
          <option value="resolved">resolved</option>
          <option value="active">active</option>
        </select>

        <select value={verificationStatus} onChange={e => {
          e.preventDefault();
          setVerificationStatus(e.target.value)
        }}>
          <option value=""></option>
          <option value="resolved">confirmed</option>
          <option value="active">differential</option>
        </select>

        <select value={resource} onChange={e => {
          e.preventDefault();
          setResource(e.target.value)
        }}>
          <option value=""></option>
          {resources.map((data, i) => <option key={i} value={`${data}`}>{data}</option>)}
        </select>

      </div>

      <div class="container-table100">
        <div class="wrap-table100">

          <div class="table100 ver1 m-b-110">
            <div class="table100-head">
              <table>
                <thead>
                  <tr class="row100 head">
                    {heads.map((data, i) => <th key={i} class="cell100 column1">{data}</th>)}
                  </tr>
                </thead>
              </table>
            </div>

            <div class="table100-body js-pscroll">
              <table>
                <tbody>
                  {list.map((data, i) => (<tr key={i} class="row100 body">
                    <td class="cell100 column1">{data.clinicalStatus}</td>
                    <td class="cell100 column3">{data.dateRecorded}</td>
                    <td class="cell100 column4">{data.verificationStatus}</td>
                    <td class="cell100 column5">{data.resource}</td>
                  </tr>))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Table;