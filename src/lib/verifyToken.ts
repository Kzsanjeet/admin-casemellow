export async function verifyToken(token: string): Promise<boolean> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_PORT}/admin/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include", // Use "include" to allow sending cookies with the request
      });
  
      if (!response.ok) {
        console.error(`Token verification failed with status: ${response.status}`);
        return false;
      }
  
      const data = await response.json(); // Parse JSON response
      return data.success === true; // Return true if `success` is true in the response
    } catch (error) {
      console.error("Token verification failed:", error);
      return false;
    }
  }
  