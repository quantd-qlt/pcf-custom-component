import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class FontWrapper implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private _container: HTMLDivElement;
  private _fontName: string;

  /**
   * Empty constructor.
   */
  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ) {
    // Main DIV container
    this._container = document.createElement("div");
    container.appendChild(this._container);

    // Create the request for the font on Google - Poppins by default
    var link = document.createElement("link");
    link.id = "PowerFontUrl";
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css?family=Poppins&display=swap`;

    // Add the request on the head of the document
    document.getElementsByTagName("head")[0].appendChild(link);
  }

  /**
   * called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // add code to update control view
    this._fontName = context.parameters.fontName.formatted ? context.parameters.fontName.formatted : "Poppins";
    // val is the default when debugging
    if (this._fontName.length > 0 && this._fontName !== "val") {
      //title case thanks to: https://www.freecodecamp.org/news/three-ways-to-title-case-a-sentence-in-javascript-676a9175eb27/
      this._fontName = this._fontName
        .toLowerCase()
        .split(" ")
        .map(function(word) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join("+");

      //we get the previously created link element
      var link = <HTMLLinkElement>document.getElementById("PowerFontUrl");
      link.href = `https://fonts.googleapis.com/css?family=${this._fontName}&display=swap`;
    }
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return {};
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
  }
}
