# Personal Site

Built a static interim site via Python and [Flask](http://flask.pocoo.org/).
Deployed with [Frozen-Flask](https://pythonhosted.org/Frozen-Flask/) and [Netlify](https://www.netlify.com/).

## Development

There's currently no linter, so if that is added/any new packages are installed, remember to update `requirements.txt`:

```sh
pip freeze > requirements.txt
```

## Deployment

<a href="https://www.netlify.com">
  <img src="https://www.netlify.com/img/global/badges/netlify-dark.svg"/>
</a>

### Netlify settings

* Build command: `python freeze.py`
* Publish directory: `build`
