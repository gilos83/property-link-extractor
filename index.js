import { useState } from "react";

export default function PropertyLinkExtractorMobile() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleExtract = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("https://api.scrape-it.cloud/api/property", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || "Failed to extract details.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
        Property Link Extractor
      </h1>
      <input
        style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        placeholder="Paste Property Finder or Bayut link here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={handleExtract}
        disabled={loading || !url}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {loading ? "Extracting..." : "Extract Property Details"}
      </button>

      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>{error}</div>
      )}

      {result && (
        <div style={{ marginTop: '20px', backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '8px' }}>
          <div><strong>Title:</strong> {result.title}</div>
          <div><strong>Location:</strong> {result.location}</div>
          <div><strong>Price:</strong> {result.price}</div>
          <div><strong>Unit Number:</strong> {result.unit}</div>
        </div>
      )}
    </div>
  );
}