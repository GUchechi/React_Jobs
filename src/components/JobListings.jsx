import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import JobListing from "./JobListing";
import Spinner from "./Spinner";
import { fetchJobs } from "../app/JobSlice";

const JobListings = ({ isHome = false }) => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const jobStatus = useSelector((state) => state.jobs.status);
  const error = useSelector((state) => state.jobs.error);

  useEffect(() => {
    if (jobStatus === "idle") {
      dispatch(fetchJobs(isHome));
    }
  }, [dispatch, jobStatus, isHome]);

  let content;

  if (jobStatus === "loading") {
    content = <Spinner />;
  } else if (jobStatus === "succeeded") {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobListing key={job.id} job={job} />
        ))}
      </div>
    );
  } else if (jobStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>
        {content}
      </div>
    </section>
  );
};

JobListings.propTypes = {
  isHome: PropTypes.bool,
};

export default JobListings;
