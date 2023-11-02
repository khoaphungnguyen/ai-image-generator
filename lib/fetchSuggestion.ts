const fetchSuggestion = () => fetch("/api/suggesion", {
        cache: "no-store"
    }).then(res => res.json());

export default fetchSuggestion;