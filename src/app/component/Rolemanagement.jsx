'use client'
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

function RoleManagement() {
  const { user, isLoaded } = useUser();
  const [role, setRole] = useState(user?.publicMetadata?.role || ""); // Fetch current role
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const updateRole = async (newRole) => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/updateRole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          role: newRole,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage("Role updated successfully!");
      } else {
        throw new Error(data.message || "Failed to update role");
      }
    } catch (error) {
      setMessage("Failed to update role. Please try again.");
      console.error("Error updating role:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (role) {
      updateRole(role);
    }
  };

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="role">Choose your role:</label>
      <select
        id="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      >
        <option value="">Select Role</option>
        <option value="poster">Job Poster</option>
        <option value="applicant">Job Applicant</option>
        <option value="both">Both</option>
      </select>
      <button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Role"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default RoleManagement;
