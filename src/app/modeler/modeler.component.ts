import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var $: JQueryStatic;
import * as _ from 'lodash';
import * as joint from 'jointjs';

@Component({
  selector: 'app-modeler',
  templateUrl: './modeler.component.html',
  styleUrls: ['./modeler.component.css']
})
export class ModelerComponent implements OnInit {
  editEnabled = true;

  graph: joint.dia.Graph;
  paper: joint.dia.Paper;

  @Input() data: any;

  @Output() modelSelected = new EventEmitter();

  readOnlyValue = true;
  @Input()
  set readOnly(value: boolean) {
    this.readOnlyValue = value;
    if (this.paper) {
      this.paper.setInteractivity(!this.readOnly);
    }
  }
  get readOnly(): boolean {
    return this.readOnlyValue;
  }

  scaleValue = 1.0;
  @Input()
  set scale(value: number) {
    this.scaleValue = value;
    if (this.paper) {
      this.paper.scale(this.scale);
    }
  }
  get scale(): number {
    return this.scaleValue;
  }

  ngOnInit() {
    this.initializeCanvas();
    const cells = this.buildGraphFromAdjacencyList(this.data);
    this.graph.resetCells(cells);
    joint.layout.DirectedGraph.layout(this.graph, { setLinkVertices: false });
  }

  initializeCanvas() {
    if (!this.graph) {
      this.graph = new joint.dia.Graph();
      this.paper = new joint.dia.Paper({
        el: $('#paper-container'),
        model: this.graph,
        width: 800,
        height: 500,
        gridSize: 1
      });
      this.paper.setInteractivity(!this.readOnly);
      this.paper.scale(this.scale);

      /*
      this.paper.on('element:doSomething', element => {
        console.log('do something else...');
        console.log(element.model.get('model'));
      });
      */

      this.paper.on('all', element => {
        // console.log(element);
      });

      this.paper.on('link:pointerdown', link => {
        console.log(link);
      });

      this.paper.on('element:pointerdown', element => {
        this.modelSelected.emit(element.model.get('model'));
      });

      this.paper.on('blank:pointerclick', () => {
        // this.selectedModel = undefined;
      });
    }
  }

  buildGraphFromAdjacencyList(adjacencyList: any) {
    const elements = [];
    const links = [];

    console.log(adjacencyList);
    _.each(adjacencyList, (edges, parentElementLabel) => {
      elements.push(this.makeElement(parentElementLabel));
      _.each(edges, childElementLabel => {
        links.push(this.makeLink(parentElementLabel, childElementLabel));
      });
    });

    // Links must be added after all the elements. This is because when the links
    // are added to the graph, link source/target
    // elements must be in the graph already.
    return elements.concat(links);
  }

  makeLink(parentElementLabel: any, childElementLabel: any) {
    return new joint.dia.Link({
      source: { id: parentElementLabel },
      target: { id: childElementLabel },
      // attrs: { '.marker-target': { d: 'M 4 0 L 0 2 L 4 4 z' } },
      smooth: false
    });
  }

  makeElement(label: string) {
    const maxLineLength = 1;
    /*
    // Compute width/height of the rectangle based on the number
    // of lines in the label and the letter size. 0.6 * letterSize is
    // an approximation of the monospace font letter width.
*/
    const letterSize = 18;
    const width = 2 * (letterSize * (0.6 * maxLineLength + 1));
    const height = 2 * ((label.split('\n').length + 1) * letterSize);

    return new joint.shapes.basic.Rect({
      id: label,
      size: { width: width, height: height },
      attrs: {
        text: { text: label, 'font-size': letterSize },
        rect: {
          width: width,
          height: height,
          rx: 5,
          ry: 5
        }
      }
    });
  }
}
