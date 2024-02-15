import React, { useState, useEffect } from "react";
import NavBar from "../../../Layouts/NavBar";
import { Link } from "react-router-dom";
import { ReportService } from "../../Services/ReportService";
import { IReports } from "../../Models/IReport";
import { ISearchReportsRequest } from "../../Models/ISearchReportsRequest";

const Report: React.FC = () => {
  const [planNames, setPlanNames] = useState<string[]>([]);
  const [planStatuses, setPlanStatuses] = useState<string[]>([]);
  const [formData, setFormData] = useState<ISearchReportsRequest>({
    planName: "",
    planStatus: "",
    startDate: "",
    endDate: "",
  });

  const [searchResults, setSearchResults] = useState<IReports[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  useEffect(() => {
    const fetchPlanNames = () => {
      ReportService.getPlanNames()
        .then((names) => {
          console.log("Plan Names:", names);
          setPlanNames(names);
        })
        .catch((error) => console.error("Error fetching plan names:", error));
    };

    const fetchPlanStatuses = () => {
      ReportService.getPlanStatus()
        .then((statuses) => {
          console.log("Plan Statuses:", statuses);
          setPlanStatuses(statuses);
        })
        .catch((error) =>
          console.error("Error fetching plan statuses:", error)
        );
    };

    fetchPlanNames();
    fetchPlanStatuses();
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchResults]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSearchFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    ReportService.searchReports(formData)
      .then((results) => setSearchResults(results))
      .catch((error) => console.error("Error fetching search results:", error));
  };

  const handleDownloadPdf = () => {
    ReportService.downloadPDF()
      .then((response) => {
        const blob = new Blob([(response as any).data], {
          type: "application/pdf",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "viewReports.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Error downloading PDF:", error));
  };
  const handleDownloadExcel = () => {
    ReportService.downloadExcel().then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Entities.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <>
      <NavBar color="bg-dark" />
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-12">
            <div className="card shadow-lg bg-success">
              <div className="card-body">
                <h4 className="text-white">Create Report</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <form className="d-flex " onSubmit={handleSearchFormSubmit}>
              <div className="col-sm-2 me-2">
                <label className="form-label" id="plan-name-input">
                  Plan Name
                </label>
                <select
                  id="plan-name-input"
                  className="form-select"
                  name="planName"
                  onChange={handleInputChange}
                  value={formData.planName} // Add this line
                >
                  <option value="">-Plan Name-</option>
                  {planNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-sm-2 me-2">
                <label className="form-label" id="plan-status-input">
                  Plan Status
                </label>
                <select
                  id="plan-status-input"
                  className="form-select"
                  name="planStatus"
                  onChange={handleInputChange}
                  value={formData.planStatus} // Add this line
                >
                  <option value="">-Plan Status-</option>
                  {planStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-sm-2 me-2">
                <label className="form-label" id="start-date-input">
                  Start Date
                </label>
                <input
                  id="start-date-input"
                  className="form-control"
                  type="date"
                  name="startDate"
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-sm-2 me-2">
                <label className="form-label">End Date</label>
                <input
                  id="end-date-input"
                  className="form-control"
                  type="date"
                  name="endDate"
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-sm-2 ms-3">
                <input
                  className="btn btn-primary mt-4"
                  type="submit"
                  value="Search"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-12">
            <table className="table table-hover text-center table-striped shadow-lg">
              <thead>
                <tr>
                  <th scope="col">S.NO</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Mobile Number</th>
                  <th scope="col">Gender</th>
                  <th scope="col">SSN</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((result, index) => (
                  <tr key={index}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>{result.name}</td>
                    <td>{result.email}</td>
                    <td>{result.mobile}</td>
                    <td>{result.gender}</td>
                    <td>{result.ssn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-12">
            <ul className="pagination justify-content-center">
              {currentPage > 1 && (
                <li className="page-item">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    className="page-link"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
              )}

              {Array.from(
                { length: Math.ceil(searchResults.length / itemsPerPage) },
                (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      onClick={() => paginate(i + 1)}
                      className="page-link"
                    >
                      {i + 1}
                    </button>
                  </li>
                )
              )}

              {currentPage < Math.ceil(searchResults.length / itemsPerPage) && (
                <li className="page-item">
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    className="page-link"
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-sm-12 d-md-flex">
            <Link to="/" className="btn btn-dark ">
              <i className="bi bi-arrow-left-circle-fill"></i> Back
            </Link>
            <div className="ms-auto">
              <button
                className="btn btn-primary me-md-2"
                type="button"
                onClick={handleDownloadExcel}
              >
                Download Excel
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleDownloadPdf}
              >
                Download Pdf
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
