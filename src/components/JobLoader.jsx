const jobLoader = async ({ params }) => {
    try {
      const res = await fetch(`/api/jobs/${params.id}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch job:", error);
      return { title: "Job not found" }; // or handle error appropriately
    }
  };
  
  export default jobLoader;
  