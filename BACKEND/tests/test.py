try:
    from __init__ import create_app
    import unittest

    app = create_app("test_config.py")
    print("Hello world")
except Exception as e:
    print(e)


