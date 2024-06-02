export const func = {
    get_current_weather: (args, id) => {
        const params = JSON.parse(args)
        //return params["location"] 
        const unit = 49;
        //return 56
        return {
            role: "tool",
            content: `The weather in ${params['location']} is 72 degrees ${unit} and sunny.`,
            toolCallId: id,
          }
    }
}