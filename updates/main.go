package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func homePage(w http.ResponseWriter, r *http.Request) {
	// Open our jsonFile
	jsonFile, err := os.Open("updates.json")
	// if we os.Open returns an error then handle it
	if err != nil {
		fmt.Println(err)
	}
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)

	var result map[string]interface{}
	json.Unmarshal([]byte(byteValue), &result)
	prettyJSON, err := json.MarshalIndent(result, "", "    ")
	if err != nil {
		log.Fatal("Failed to generate json", err)
	}
	fmt.Fprintf(w, string(prettyJSON))
	//	json.NewEncoder(w).Encode(prettyJSON)

}

func handleRequests() {
	http.HandleFunc("/", homePage)
	log.Fatal(http.ListenAndServe("127.0.0.1:10000", nil))
}

func main() {
	handleRequests()
}
