import { useState, useEffect } from "react";
import { CgSearchFound } from "react-icons/cg";

import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Summary = () => {
  const [articleUrl, setArticleUrl] = useState("");
  const [summaryUrl, setSummaryUrl] = useState("");
  const [allArticleUrls, setAllArticleUrls] = useState([]);
  const [copiedUrl, setCopiedUrl] = useState("");

  useEffect(() => {
    const articlesLocalStorage = JSON.parse(localStorage.getItem("articles"));

    if (articlesLocalStorage) {
      setAllArticleUrls(articlesLocalStorage);
    }
  }, []);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl });

    if (data?.summary) {
      const newData = data.summary;
      const updatedAllArticleUrls = [articleUrl, ...allArticleUrls];

      setSummaryUrl(newData);
      setAllArticleUrls(updatedAllArticleUrls);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticleUrls));
    }
  };

  const onInputChange = (e) => setArticleUrl(e.target.value);

  const handleCopy = (url) => {
    setCopiedUrl(url);
    navigator.clipboard.writeText(url);
    setTimeout(() => setCopiedUrl(false), 3000);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />

          <input
            type="url"
            placeholder="Enter your URL"
            value={articleUrl}
            onChange={onInputChange}
            required
            className="url_input peer"
          />

          <button
            type="submit"
            disabled={isFetching}
            className={`submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 ${
              isFetching ? "submit_btn-disabled" : ""
            }`}
          >
            <CgSearchFound />
          </button>
        </form>

        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticleUrls.map((item, index) => (
            <div
              key={index}
              className="link_card"
              onClick={() => setArticleUrl(item)}
            >
              <div className="copy_btn" onClick={() => handleCopy(item)}>
                <img
                  src={copiedUrl === item ? tick : copy}
                  alt="copy"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 max-w-full flex flex-col justify-center items-center">
        {isFetching && (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        )}
        {error && !isFetching && (
          <p className="font-inter font-bold text-black text-center">
            Oops... Something went wrong, please try again
          </p>
        )}
        {summaryUrl && !isFetching && !error && (
          <div className="flex flex-col gap-3">
            <h2 className="blue_gradient font-satoshi font-bold text-xl">
              Article SUMMARY
            </h2>
            <div className="summary_box">
              <p className="font-inter font-medium text-sm text-gray-700">
                {summaryUrl}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Summary;
