import axios from 'axios';

export class MondayClient {
  constructor(private apiKey: string, private apiUrl: string = 'https://api.monday.com/v2') {}

  async createItem(boardId: number, itemName: string) {
    const query = `mutation {
      create_item (board_id: ${boardId}, item_name: "${itemName}") {
        id
      }
    }`;

    const response = await axios.post(
      this.apiUrl,
      { query },
      {
        headers: {
          Authorization: this.apiKey,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  }

  async getBoardData(boardId: number) {
    const query = `query {
      boards(ids: ${boardId}) {
        items {
          id
          name
          column_values {
            id
            title
            value
            text
          }
        }
      }
    }`;

    const response = await axios.post(
      this.apiUrl,
      { query },
      {
        headers: {
          Authorization: this.apiKey,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  }
}
