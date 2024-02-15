import axios, { AxiosResponse } from "axios";
import { IReports } from "../Models/IReport";
import { ISearchReportsRequest } from "../Models/ISearchReportsRequest";

export class ReportService {
  private static serverUrl: string = "http://localhost:8282/reports";

  public static searchReports(
    request: ISearchReportsRequest
  ): Promise<IReports[]> {
    const dataUrl: string = `${ReportService.serverUrl}/search`;
    return axios
      .get(dataUrl, { params: request })
      .then((response: AxiosResponse<IReports[]>) => response.data);
  }

  public static getPlanNames(): Promise<string[]> {
    const dataUrl: string = `${ReportService.serverUrl}/plan-names`;
    return axios
      .get(dataUrl)
      .then((response: AxiosResponse<string[]>) => response.data);
  }

  public static getPlanStatus(): Promise<string[]> {
    const dataUrl: string = `${ReportService.serverUrl}/plan-status`;
    return axios
      .get(dataUrl)
      .then((response: AxiosResponse<string[]>) => response.data);
  }
  public static downloadPDF(): Promise<Blob> {
    let dataUrl: string = `${this.serverUrl}/pdf`;
    return axios.get(dataUrl, { responseType: "blob" });
  }
  public static downloadExcel(): Promise<Blob> {
    const downloadUrl: string = `${ReportService.serverUrl}/excel`;
    return axios
      .get(downloadUrl, { responseType: "blob" })
      .then((response) => response.data);
  }
}
