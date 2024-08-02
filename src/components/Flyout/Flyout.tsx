import React from "react";
import type { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { clearCheckboxLsit } from "../../store/slices/checkboxSlice";
import classes from "./flyout.module.scss";

interface Artwork {
  id: number;
  title: string;
  image_id: string;
  artist_display: string;
  description: string | null;
}

const convertToCSV = (data: Artwork[]) => {
  const header = ["id", "title", "artist_display", "description", "image_id"];
  const rows = data.map((item) => [
    item.id,
    item.title,
    item.artist_display,
    item.description,
    item.image_id,
  ]);

  return [header.join(","), ...rows.map((row) => row.join(","))].join("\n");
};

const downloadCSV = (csvContent: string, filename: string) => {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

const useFetchMultipleItems = (ids: string[]) => {
  const fetchData = async () => {
    try {
      const requests = ids.map((id) => fetchSingleItem(id));
      const results = await Promise.all(requests);
      return results;
    } catch (error) {
      console.error("Error fetching items:", error);
      return [];
    }
  };

  const fetchSingleItem = async (id: string) => {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,artist_display,description,image_id`,
    );
    return response.json();
  };

  return { fetchData };
};

const Flyout: React.FC = () => {
  const checkboxes = useSelector((state: RootState) => state.checkboxes);
  const { fetchData } = useFetchMultipleItems(
    checkboxes.map((item) => item.toString()),
  );

  const dispatch = useDispatch();

  function deleteAllCheckedItems(): void {
    dispatch(clearCheckboxLsit());
  }

  const downloadCheckedItems = async (): Promise<void> => {
    const results = await fetchData();
    const savedArtowrks = results.map((el) => el.data);
    console.log(savedArtowrks);
    const csvContent = convertToCSV(savedArtowrks);
    downloadCSV(csvContent, `${checkboxes.length}_artworks.csv`);
  };

  return (
    <>
      {checkboxes.length > 0 && (
        <div className={classes.flyout}>
          <p>{checkboxes.length} items are selected</p>
          <button onClick={deleteAllCheckedItems}>Unselect all</button>
          <button onClick={downloadCheckedItems}>Download</button>
        </div>
      )}
    </>
  );
};

export default Flyout;
